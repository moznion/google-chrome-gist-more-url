function constructUri(baseUri) {
    var httpsUri, sshUri, gitUri;

    httpsUri = baseUri.replace(/(.*):\/\/(.*)\/.*?\/(.*)$/, "$1://$2/$3.git");
    sshUri   = httpsUri.replace(/.*:\/\/(.*)\/(.*)/, "git@$1:$2");
    gitUri   = httpsUri.replace(/.*\/\/(.*)/, "git://$1");

    return {'ssh': sshUri, 'git': gitUri};
}

function constructListElement(protocol, uri) {
    return '<li>' +
        '<label for="link-field">' +
        '<strong>clone</strong> ' +
        'this gist (' + protocol + ')' +
        '</label>' +
        '<input type="text" readonly=" spellcheck="false" class="url-field js-url-field" name="link-field" ' +
        'value=' + uri + '>' +
        '</li>';
}

$(function () {
    $(document).on('mouseover', function () {
        var uris, targetLi, delayTime = 500;
        if ($('ul.export-references li').length < 5) { // XXX EVIL!!!
            targetLi = $($('ul.export-references li')[1]);
            uris = constructUri(targetLi.context.baseURI);
            $((constructListElement('SSH', uris.ssh))).hide().appendTo(targetLi).fadeIn(delayTime);
            $((constructListElement('Git Read-Only', uris.git))).hide().appendTo(targetLi).fadeIn(delayTime);
        }
    });
});
