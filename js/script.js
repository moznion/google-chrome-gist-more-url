$(function(){
    var url, ssh, old_url;

    url = $(location).attr('href');
    old_url = undefined;


    $(document).bind('mouseover', function() {
        if ($('ul.export-references li').length < 5) { // XXX
            ssh = '<li><label for="link-field"><strong>AAAAAAA!!!</strong> this gist</label><input type="text" readonly=" spellcheck="false" class="url-field js-url-field" name="link-field" value="https://gist.github.com/Shinpeim/4982776"></li>';
            $('ul.export-references li').each(function(i) {
                if (i === 1) {
                    // console.log($(this).context.baseURI);
                    $($(this)).after(ssh);
                }
            });
        }
    });
});
