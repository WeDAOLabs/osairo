import { NATIVE } from "cc/env";

export class utils {
  static stringIsEmpty(str: string | null | undefined) {
    return !str || str === "";
  }

  static async copyTextToClipboard(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!NATIVE) {
        // TODO web端复制
        //@ts-ignore
        const result = this.webCopyString(text);
        result ? resolve() : reject();
      } else {
        // TODO native copy
        reject();
      }
    });
  }

  private static webCopyString(txt: string) {
    let input = txt;
    const el = document.createElement("textarea");
    el.value = input;
    el.setAttribute("readonly", "");
    el.style.contain = "strict";
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.fontSize = "12pt"; // Prevent zooming on iOS

    const selection: any = document.getSelection();
    var originalRange = false;
    if (selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }
    document.body.appendChild(el);
    el.select();
    el.selectionStart = 0;
    el.selectionEnd = input.length;

    var success = false;
    try {
      success = document.execCommand("copy");
    } catch (err) {
      console.log("copy error", success);
    }

    document.body.removeChild(el);

    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    return success;
  }
}
