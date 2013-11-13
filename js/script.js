document.addEventListener("DOMContentLoaded", function() {
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

    function appendList() {
        var $urlList  = $('ul.export-references li');

        if ($urlList.length > 0 && $('_gistmoreurl').length == 0) {
            var $targetLi = $($urlList[1]);
            var $baseURI;
            try {
                baseURI = $targetLi.context.baseURI;
            } catch (e) {
                return;
            }
            var sshGist = new Gist(baseURI, 'ssh', 'SSH');
            var gitGist = new Gist(baseURI, 'git', 'Git Read-Only');

            var delayTime = 500;
            $(sshGist.constructList()).hide().appendTo($targetLi).fadeIn(delayTime);
            $(gitGist.constructList()).hide().appendTo($targetLi).fadeIn(delayTime);
        }
    }

    $.pageUpdate(appendList);
});
