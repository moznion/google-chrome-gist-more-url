var Gist = function (baseURL, protocol, description) {
    if (!Gist.prototype.httpsURL) {
        Gist.prototype.httpsURL = baseURL.replace(/(.*):\/\/(.*)\/.*?\/(.*)$/, "$1://$2/$3.git");
    }

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

Gist.prototype.constructList = function () {
    var urlInfo = this.urlInfo;

    var list_template = '<li>' +
        '<label for="link-field">' +
        '<strong>clone</strong> ' +
        'this gist (<%- description %>)' +
        '</label>' +
        '<input type="text" readonly=" spellcheck="false" class="url-field js-url-field" name="link-field" ' +
        'value=<%- url %>>' +
        '</li>';
    var list = _.template(list_template)({
        description: urlInfo.description,
        url:         urlInfo.url
    });

    return list;
};

$(function () {
    var uris, targetLi, delayTime = 500;

    if ($('ul.export-references li').length < 5) { // XXX EVIL!!!
        targetLi = $($('ul.export-references li')[1]);
        var sshGist = new Gist(targetLi.context.baseURI, 'ssh', 'SSH');
        var gitGist = new Gist(targetLi.context.baseURI, 'git', 'Git Read-Only');
        sshGist.parseURL();
        gitGist.parseURL();

        $(sshGist.constructList()).hide().appendTo(targetLi).fadeIn(500);
        $(gitGist.constructList()).hide().appendTo(targetLi).fadeIn(500);
    }
});
