export type WindowSize = {
  width: number;
  height: number;
};

export const getWindowSize = (): WindowSize => {
  var docEl = document.documentElement,
    IS_BODY_ACTING_ROOT = docEl && docEl.clientHeight === 0;

  // Used to feature test Opera returning wrong values
  // for documentElement.clientHeight.
  function isDocumentElementHeightOff() {
    var d = document,
      div = d.createElement("div");
    div.style.height = "2500px";
    d.body.insertBefore(div, d.body.firstChild);
    var r = d.documentElement.clientHeight > 2400;
    d.body.removeChild(div);
    return r;
  }

  if (IS_BODY_ACTING_ROOT || isDocumentElementHeightOff()) {
    var b = document.body;
    return { width: b.clientWidth, height: b.clientHeight };
  } else {
    return { width: docEl.clientWidth, height: docEl.clientHeight };
  }
};
