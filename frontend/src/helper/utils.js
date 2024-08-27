import moment from "moment";

export const getCookie = (name) => {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  // Return null if not found
  return null;
};

export const dateFunction = (date) => {
  if (
    moment(date).format("YYYY.MM.DD") ===
    moment(new Date()).format("YYYY.MM.DD")
  ) {
    return "Today";
  } else if (
    moment(date).format("YYYY.MM.DD") ===
    moment(new Date()).subtract(1, "days").format("YYYY.MM.DD")
  ) {
    return "Yesterday";
  }
  return moment(date).format("YYYY.MM.DD");
};

export const checkImageURL = (nationality) => {
  const pngImages = ["Antarctica"];

  let url_image = `./img/flags/${nationality}.svg`;
  if (pngImages.includes(nationality)) {
    url_image = `./img/flags/${nationality}.png`;
  }
  return url_image;
};

/*------------------------------------old file------------------------------------- */

export const downloadAsFile = (name, data) => {
  let blob = new Blob([data]);
  let downloadLink = document.createElement("a");
  downloadLink.target = "_blank";
  downloadLink.download = name;
  let downloadUrl = URL.createObjectURL(blob);
  downloadLink.href = downloadUrl;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(downloadUrl);
};

export const chunkSubstr = (str, size) => {
  if (typeof str !== "string") {
    return [str];
  }

  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
};

export const copy = (data) => {
  if (!data) {
    return data;
  }

  if (Array.isArray(data)) {
    return [...data];
  }

  if (typeof data === "object") {
    return { ...data };
  }

  return data;
};

export const getValueByPath = (obj, path, fallback) => {
  if (!obj || !path) {
    return fallback;
  }

  const dotIndex = path.indexOf(".");
  let key = path;
  let rest = null;

  if (dotIndex > -1) {
    key = path.substring(0, dotIndex);

    rest = path.substring(dotIndex + 1, path.length);
  }

  let value = obj[key];

  if (typeof value === "object" && rest) {
    return getValueByPath(value, rest, fallback);
  }

  if (rest) {
    return fallback;
  }

  return copy(value) || fallback;
};

export const setValueByPath = (obj, path, value) => {
  if (value === null || value === undefined || !path) {
    return;
  }

  const dotIndex = path.indexOf(".");
  let key = path;
  let rest = null;

  if (dotIndex > -1) {
    key = path.substring(0, dotIndex);

    rest = path.substring(dotIndex + 1, path.length);
  }

  if (rest && (typeof obj[key] !== "object" || Array.isArray(obj[key]))) {
    obj[key] = {};
  }

  obj[key] = rest ? setValueByPath(obj[key], rest, value) : value;

  return obj;
};

export const flattenWorkflowConfig = (workflowConfig) => {
  let flattendConfig = [];

  Object.keys(workflowConfig).forEach((step) => {
    flattendConfig = [...flattendConfig, ...workflowConfig[step]];
  });

  return flattendConfig;
};

export const flattenObject = (object) => {
  if (!object) {
    return {};
  }

  let flattendObject = {};

  Object.keys(object).forEach((key) => {
    if (typeof object[key] !== "object") {
      flattendObject = {
        ...flattendObject,
        [key]: object[key],
      };

      return;
    }

    flattendObject = {
      ...flattendObject,
      ...flattenObject(object[key]),
    };
  });

  return flattendObject;
};

export const serialize = (config, data, obj = {}) => {
  for (const item of config) {
    if (
      typeof item.isVisible === "function" &&
      item.isVisible({
        formValues: data,
      }) === false
    ) {
      continue;
    }

    if (!item.path) {
      item.path = item.name;
    }

    if (typeof item.path === "string") {
      const [get, set] = item.path.split(":");
      item.path = set || get;
    }

    if (typeof item.serialize === "function") {
      item.serialize({
        obj,
        item,
        data,
      });

      continue;
    }

    if (typeof item.component?.serialize === "function") {
      item.component.serialize({
        obj,
        item,
        data,
      });

      continue;
    }

    if (typeof item.serialize === "string") {
      setValueByPath(obj, item.path, item.serialize);

      continue;
    }

    setValueByPath(obj, item.path, data[item.name]);
  }

  return obj;
};

export const deserialize = (config, data, obj = {}) => {
  for (const item of config) {
    if (!item.path) {
      item.path = item.name;
    }

    if (typeof item.path === "string") {
      const [get] = item.path.split(":");
      item.path = get;
    }

    if (typeof item.deserialize === "function") {
      item.deserialize({
        obj,
        item,
        data,
      });

      continue;
    }

    if (!item.component) {
      continue;
    }

    if (typeof item.component.deserialize === "function") {
      item.component.deserialize({
        obj,
        item,
        data,
      });

      continue;
    }

    obj[item.name] = getValueByPath(data, item.path, item.component.default);
  }

  return obj;
};

export const resolveConfig = (config, context, ignoreKey = ["component"]) => {
  if (!config) {
    return;
  }

  const field = { ...config };
  ignoreKey = new Set(ignoreKey);

  for (const [key, val] of Object.entries(field)) {
    if (typeof val === "function") {
      if (!val.forceResolve && ignoreKey.has(key)) {
        continue;
      }

      field[key] = val(context);
    }
  }

  return field;
};

export const deepSpread = (obj1, obj2) => {
  const obj = Array.isArray(obj1) ? [...obj1] : { ...obj1 };

  for (const [key, value] of Object.entries(obj2)) {
    if (!obj[key]) {
      obj[key] = obj2[key];
      continue;
    }

    if (typeof value !== typeof obj[key]) {
      obj[key] = value;
      continue;
    }

    if (typeof value === "object") {
      obj[key] = deepSpread(obj1[key], obj2[key]);

      continue;
    }

    obj[key] = obj2[key];
  }

  return obj;
};

export const formatNumber = (n) => {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCurrency = (value, prefix = "", suffix = "") => {
  if (!value || value === "") {
    return;
  }

  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  // get input value
  let input_val = typeof value === "number" ? value.toString() : value;

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    let decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    let left_side = input_val.substring(0, decimal_pos);

    let right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    right_side += "00";

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = prefix + left_side + "." + right_side + suffix;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = prefix + input_val + suffix;
    input_val += ".00";
  }

  return input_val;
};

export const currencyToNumber = (value) => {
  if (!value || typeof value === "number") {
    return value;
  }

  return parseFloat(value.replace(/[^0-9.-]/g, ""));
};

export const generateUUID = () => {
  let d = new Date().getTime();

  let d2 = (performance && performance.now && performance.now() * 1000) || 0;

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16

    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }

    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string") {
    return "";
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
