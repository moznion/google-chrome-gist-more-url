var Gist = function (baseURL, protocol, description) {
    this.httpsURL = baseURL.replace(/(.*):\/\/(.*)\/.*?\/(.*)$/, "$1://$2/$3.git");
    this.urlInfo = {
        protocol:    protocol,
        description: description,
        url:         ''
    };
};

Gist.prototype.parseURL = function () {
    var httpsURL  = this.httpsURL,
        protocol  = this.urlInfo.protocol,
        url;

    if (protocol === 'ssh') {
        url = httpsURL.replace(/.*:\/\/(.*)\/(.*)/, "git@$1:$2");
    } else if (protocol === 'git') {
        url = httpsURL.replace(/.*\/\/(.*)/, "git://$1");
    }

    this.urlInfo.url = url;
};

Gist.prototype.constructListElement = function () {
    var urlInfo = this.urlInfo;

    return '<li>' +
        '<label for="link-field">' +
        '<strong>clone</strong> ' +
        'this gist (' + urlInfo.description + ')' +
        '</label>' +
        '<input type="text" readonly=" spellcheck="false" class="url-field js-url-field" name="link-field" ' +
        'value=' + urlInfo.url + '>' +
        '</li>';
};

$(function () {
    var uris, targetLi, delayTime = 500;

    if ($('ul.export-references li').length < 5) { // XXX EVIL!!!
        targetLi = $($('ul.export-references li')[1]);
        var sshGist = new Gist(targetLi.context.baseURI, 'ssh', 'SSH');
        var gitGist = new Gist(targetLi.context.baseURI, 'git', 'Git Read-Only');
        sshGist.parseURL();
        gitGist.parseURL();

        $(sshGist.constructListElement()).hide().appendTo(targetLi).fadeIn(500);
        $(gitGist.constructListElement()).hide().appendTo(targetLi).fadeIn(500);
    }
});
