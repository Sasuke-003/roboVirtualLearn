export const validateUserName = username => {
  var usernameRegex = /^[0-9a-zA-Z_.-]+$/;
  return usernameRegex.test(username);
};

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePassword = password => {
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&#]{6,}$/;
  return passwordRegex.test(password);
};

export const toTitleCase = str => {
  return str.replace(
    /(^\w|\s\w)(\S*)/g,
    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
  );
};

export const isValidTwitterLink = link => {
  if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(link)) {
    return true;
  } else {
    return false;
  }
};
export const isValidFacebookLink = link => {
  if (/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(link)) {
    return true;
  } else {
    return false;
  }
};
