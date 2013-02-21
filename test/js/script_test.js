module('constructUri');
test('constructUri', 1, function() {
    var baseUri = 'https://gist.github.com/example-user/example-repos',
    actual = {
        'ssh':'git@gist.github.com:example-repos.git',
        'git':'git://gist.github.com/example-repos.git'
    };
    deepEqual(actual, constructUri(baseUri), "return expected uris");
});
