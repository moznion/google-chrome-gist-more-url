var Gist = function (baseURL, protocol, description) {
    if (!Gist.prototype.httpsURL) {
        Gist.prototype.httpsURL = baseURL.replace(/(.*):\/\/(.*)\/.*?\/(.*)$/, "$1://$2/$3.git");
    }

    var url = '';
    if (protocol === 'ssh') {
        url = this.httpsURL.replace(/.*:\/\/(.*)\/(.*)/, "git@$1:$2");
    } else if (protocol === 'git') {
        url = this.httpsURL.replace(/.*\/\/(.*)/, "git://$1");
    }

    this.urlInfo = {
        protocol:    protocol,
        description: description,
        url:         url
    };
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
    $.event.add(document, 'mouseover', function() {
        var delayTime = 500;
        var $urlList  = $('ul.export-references li');

        if ($urlList.length < 5) { // XXX EVIL!!!
            var $targetLi = $($urlList[1]);
            var sshGist = new Gist($targetLi.context.baseURI, 'ssh', 'SSH');
            var gitGist = new Gist($targetLi.context.baseURI, 'git', 'Git Read-Only');

            $(sshGist.constructList()).hide().appendTo($targetLi).fadeIn(delayTime);
            $(gitGist.constructList()).hide().appendTo($targetLi).fadeIn(delayTime);
        }
    });
});
