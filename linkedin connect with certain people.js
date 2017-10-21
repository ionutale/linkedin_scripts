//Modified the "Add CEO's only" code a bit cause I couldn't get it to work.
//Should run fine now:

// ! EDIT !
// I Have made it so you can search for an array of roles

// Write any role you want the person to have, example "CEO", "Investor"
// !! Don't forget to add comma efter every word !! //
var userRole = [
    "CEO",
    "iOS"
];

var inviter = {} || inviter;
var totalInvites = 0;
inviter.userList = [];
inviter.className = 'button-secondary-small';
var addedPpl = 0;

inviter.refresh = function () {
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(document.body.scrollHeight, 0);
    window.scrollTo(0, document.body.scrollHeight);
};

inviter.initiate = function () {
    inviter.refresh();
    var connectBtns = document.getElementsByClassName(inviter.className);

    if (connectBtns == null) {
        var connectBtns = inviter.initiate();
    }

    return connectBtns;
};
inviter.invite = function () {
    var connectBtns = inviter.initiate();
    var buttonLength = connectBtns.length;
    for (var i = 0; i < buttonLength; i++) {
        if (connectBtns != null && connectBtns[i] != null) {
            inviter.handleRepeat(connectBtns[i]);
        }
        if (i == buttonLength - 1) {
            console.log("Added: " + addedPpl);
            totalInvites += i;
            console.log('total: ' + totalInvites);
            inviter.refresh();
        }
    }
};

inviter.handleRepeat = function (button) {
    var nameValue = button.children[1].textContent
    var name = nameValue.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    function hasRole(role) {
        for (var i = 0; i < role.length; i++) {
            var position = button.parentNode.parentNode.children[1].children[1].children[0].children[3].textContent;
            var formatedPosition = position.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var hasRole = formatedPosition.indexOf(role[i]) == -1 ? false : true;
            console.log('Has role: ' + role[i] + ' -> ' + hasRole);
            if (hasRole) {
                return hasRole;
            }
        }
        return false;
    }

    if (inviter.arrayContains(name)) {
        console.log("cancel");
        var cancel = button.parentNode.parentNode.children[0];
        cancel.click();
    } else if (hasRole(userRole) == false) {
        console.log("cancel");
        var cancel = button.parentNode.parentNode.children[0];
        cancel.click();
    } else {
        console.log("add");
        inviter.userList.push(name);
        button.click();
        addedPpl++;
    }
};

inviter.arrayContains = function (item) {
    return (inviter.userList.indexOf(item) > -1);
};

inviter.usersJson = {};

inviter.loadResult = function () {

    var retrievedObject = localStorage.getItem('inviterList');
    var temp = JSON.stringify(retrievedObject);
    inviter.userList = JSON.parse(temp);
};

inviter.saveResult = function () {
    inviter.usersJson = JSON.stringify(inviter.userList);
    localStorage.setItem('inviterList', inviter.usersJson);
};

setInterval(function () {
    inviter.invite();
}, 5000);