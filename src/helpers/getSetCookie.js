export function getCookie(name) {
    const cookiePairs = document.cookie?.split('; ')
    if (cookiePairs) {
        const found = cookiePairs
            .find((el) => {
                let cookie = el.split('=')
                if (cookie[0] === name && cookie[1]) return true
            })
            ?.split('=')[1]

        return found
    }

    return null
}

export function setCookie(name, value, attributes = {}) {
    attributes = {
        path: '/',
        ...attributes
    }

    if (attributes.expires instanceof Date) {
        attributes.expires = attributes.expires.toUTCString()
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (let attributeKey in attributes) {
        updatedCookie += '; ' + attributeKey
        let attributeValue = attributes[attributeKey]
        if (attributeValue !== true) {
            updatedCookie += '=' + attributeValue
        }
    }

    document.cookie = updatedCookie
}
