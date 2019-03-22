'use strict';

let getMakeCredentialsChallenge = (formBody) => {
    return fetch('/makeCredential/' + formBody.username + '?attType=none&authType=', {
    })
    .then((response) => response.json())
    .then((response) => {
        return response
    })
}

let sendWebAuthnAttestationResponse = (body) => {
    return fetch('/makeCredential', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        if(response !== 'Created')
            throw new Error(`Server responed with error. The message is: ${response}`);

        return response
    })
}

let sendWebAuthnAssertionResponse = (body) => {
    return fetch('/assertion', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        if(!response)
            throw new Error('Server responed with error.');
        return response
    })
}

/* Handle for register form submission */
$('#register').submit(function(event) {
    event.preventDefault();

    let username = this.username.value;
    let displayName     = this.displayName.value;

    if(!username || !displayName) {
        alert('Display name or username is missing!')
        return
    }

    getMakeCredentialsChallenge({username, displayName})
        .then((response) => {
            let publicKey = preformatMakeCredReq(response.publicKey);
            return navigator.credentials.create({ publicKey })
        })
        .then((response) => {
            let makeCredResponse = publicKeyCredentialToJSON(response);
            return sendWebAuthnAttestationResponse(makeCredResponse)
        })
        .then((response) => {
            if(response === 'Created') {
                loadMainRegistrationContainer()   
            } else {
                alert(`Server responed with error. The message is: ${response}`);
            }
        })
        .catch((error) => alert(error))
})

let getGetAssertionChallenge = (formBody) => {
    return fetch('/assertion/' + formBody.username, {
    })
    .then((response) => response.json())
    .then((response) => {
        return response
    }).catch((error) => {
        alert(error);
    })
}

/* Handle for login form submission */
$('#login').submit(function(event) {
    event.preventDefault();

    let username = this.username.value;

    if(!username) {
        alert('Username is missing!')
        return
    }

    getGetAssertionChallenge({username})
        .then((response) => {
            let publicKey = response.publicKey;
            publicKey.challenge = Uint8Array.from(atob(publicKey.challenge), c => c.charCodeAt(0));
            publicKey.allowCredentials.forEach(function (listItem) {
                listItem.id = Uint8Array.from(atob(listItem.id), c => c.charCodeAt(0)); 
            });
            return navigator.credentials.get({ publicKey })
        })
        .then((response) => {
            let getAssertionResponse = publicKeyCredentialToJSON(response);
            return sendWebAuthnAssertionResponse(getAssertionResponse)
        })
        .then((response) => {
            if(response) {
                loadMainAuthenticationContainer()
            } else {
                alert(`Server responed with error. The message is: ${response}`);
            }
        })
        .catch((error) => alert(error))
})