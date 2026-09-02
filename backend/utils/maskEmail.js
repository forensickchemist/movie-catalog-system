const maskEmail = (email) => {
    if (!email || !email.includes("@")) {
        return "Anonymous";
    }

    const [username, domain] = email.split("@");

    if (!username) {
        return `***@${domain}`;
    }

    if (username.length === 1) {
        return `*@${domain}`;
    }

    return `${username[0]}${"*".repeat(username.length - 1)}@${domain}`;
};

module.exports = maskEmail;