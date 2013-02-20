$(function(){
    $(document).bind('mouseover', function() {
        if ($('ul.export-references li').length < 5) { // XXX
            $('ul.export-references li').each(function(i) {
                var baseUri, httpsUri, sshUri, gitUri;
                if (i === 1) {
                    baseUri  = $(this).context.baseURI;
                    httpsUri = baseUri.replace(/(.*):\/\/(.*)\/.*?\/(.*)$/, "$1://$2/$3.git");
                    sshUri   = httpsUri.replace(/.*:\/\/(.*)\/(.*)/, "git@$1:$2");
                    gitUri   = httpsUri.replace(/.*\/\/(.*)/, "git://$1");

                    // I want more cool view behavior...
                    $($(this)).after(constructListElement('Git Read-Only', gitUri)).hide().fadeIn(1000);
                    $($(this)).after(constructListElement('SSH', sshUri)).hide().fadeIn(1000);

                    return;
                }
            });
        }
    });

    function constructListElement(protocol, uri) {
        return '<li>' +
            '<label for="link-field">' +
            '<strong>clone</strong> ' +
            'this gist (' + protocol +')' +
            '</label>' +
            '<input type="text" readonly=" spellcheck="false" class="url-field js-url-field" name="link-field" ' +
            'value=' + uri + '>' +
        '</li>';
    }
});
