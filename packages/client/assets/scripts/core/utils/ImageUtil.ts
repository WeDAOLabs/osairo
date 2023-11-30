import {
  Color,
  Graphics,
  math,
  Sprite,
  SpriteAtlas,
  SpriteFrame,
  Texture2D,
  UITransform,
} from "cc";
import { resLoader } from "../loader/ResLoader";

export default class ImageUtil {
  public static getPixelColor(texture: Texture2D, x: number, y: number): Color {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = texture.width;
    canvas.height = texture.height;
    const image = texture.getHtmlElementObj()!;
    ctx.drawImage(image, 0, 0, texture.width, texture.height);
    const imageData = ctx.getImageData(0, 0, texture.width, texture.height);
    const pixelIndex = (y - 1) * texture.width * 4 + (x - 1) * 4;
    const pixelData = imageData.data.slice(pixelIndex, pixelIndex + 4);
    const color = new Color(
      pixelData[0],
      pixelData[1],
      pixelData[2],
      pixelData[3]
    );
    image.remove();
    canvas.remove();
    return color;
  }

  public static imageToBase64(
    url: string,
    callback?: (dataURL: string) => void
  ): Promise<string> {
    return new Promise((res) => {
      let extname = /\.png|\.jpg|\.jpeg/.exec(url)?.[0]!;
      if ([".png", ".jpg", ".jpeg"].includes(extname)) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const image = new Image();
        image.src = url;
        image.onload = () => {
          canvas.height = image.height;
          canvas.width = image.width;
          ctx.drawImage(image, 0, 0);
          extname = extname === ".jpg" ? "jpeg" : extname!.replace(".", "");
          const dataURL = canvas.toDataURL(`image/${extname}`);
          callback && callback(dataURL);
          res(dataURL);
          image.remove();
          canvas.remove();
        };
      } else {
        console.warn("Not a jpg/jpeg or png resource!");
        callback && callback("");
        res("");
      }
    });
  }

  public static base64ToBlob(base64: string): Blob | null {
    const strings = base64.split(",");
    const typeArr = /image\/\w+|;/.exec(strings[0]);
    if (!typeArr || typeArr.length === 0) {
      return null;
    }
    const type = typeArr[0];
    const data = window.atob(strings[1]);
    const arrayBuffer = new ArrayBuffer(data.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < data.length; i++) {
      uint8Array[i] = data.charCodeAt(i) & 0xff;
    }
    return new Blob([uint8Array], { type: type });
  }

  /**
   * @param sprite
   * @param path
   * @param texture
   * @param callback
   */
  static setTexture(
    sprite: Sprite,
    path: string,
    texture: string,
    callback?: Function
  ) {
    const name = `${path}/${texture}`;
    const spFrame: SpriteFrame | null = resLoader.get(name, SpriteFrame);

    const __setFrame = (frame: SpriteFrame) => {
      if (sprite) {
        sprite.spriteFrame = frame;
      }
      callback && callback(sprite);
    };

    if (!spFrame) {
      resLoader.load(path, SpriteAtlas, (err: any, res: any) => {
        if (err) {
          return;
        }
        __setFrame(res.getSpriteFrame(texture));
      });
    } else {
      __setFrame(spFrame);
    }
  }

  /**
   * @param sprite
   * @param path
   * @param texture
   * @param callback
   */
  static setSpriteFrame(
    sprite: Sprite,
    path: string,
    texture: string,
    callback?: Function,
    withSizeReset: boolean = false
  ) {
    const name = `${path}/${texture}`;
    const img: SpriteFrame | null = resLoader.get(name, SpriteFrame);

    const __setFrame = (frame: SpriteFrame) => {
      if (sprite) {
        sprite.spriteFrame = frame;
        const node = sprite.node;
        if (withSizeReset && node) {
          const transform: UITransform = node.getComponent(UITransform)!;
          transform
            ? (transform.contentSize = math.size(frame.width, frame.height))
            : null;
        }
      }
      callback && callback(sprite);
    };

    if (!img) {
      resLoader.load(
        `${name}/spriteFrame`,
        SpriteFrame,
        (err: any, res: any) => {
          if (err) {
            return;
          }
          __setFrame(res);
        }
      );
    } else {
      __setFrame(img);
    }
  }

  /**
   * TODO
   * @param sprite
   * @param texture
   * @param callback
   */
  static setTextureFromRemote(
    sprite: Sprite,
    texture: string,
    callback?: Function
  ) {
    const spFrame: SpriteFrame | null = resLoader.get(texture, SpriteFrame);

    const __setFrame = (frame: SpriteFrame) => {
      if (sprite) {
        sprite.spriteFrame = frame;
      }

      callback && callback(sprite);
    };

    if (!spFrame) {
      resLoader.loadRemote(
        `${"http://"}${texture}`,
        SpriteFrame,
        (err: any, res: any) => {
          if (err) {
            return;
          }
          __setFrame(res);
        }
      );
    } else {
      __setFrame(spFrame);
    }
  }
}
