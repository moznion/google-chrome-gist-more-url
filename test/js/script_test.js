module('constructUri');
test('constructUri', 2, function() {
    var baseUri = 'https://gist.github.com/example-user/example-repos';


    var gist_ssh = new GistMoreUrl.GistUrl(baseUri, 'ssh','comment');
    var actual_ssh = {
        'protocol':'ssh',
        'description':'comment',
        'url':'git@gist.github.com:example-repos.git'
    };
    deepEqual(actual_ssh, gist_ssh.urlInfo, "return expected ssh uri");

    var gist_git = new GistMoreUrl.GistUrl(baseUri, 'git','comment');
    var actual_git = {
        'protocol':'git',
        'description':'comment',
        'url':'git://gist.github.com/example-repos.git'
    };

    deepEqual(actual_git, gist_git.urlInfo, "return expected git uri");
});
