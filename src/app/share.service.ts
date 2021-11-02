import { EventEmitter } from "@angular/core";

export class ShareService {
  private clickCnt: number = 0;
  onClick: EventEmitter<number> = new EventEmitter();

  public clickAdd(number: number) {
    this.clickCnt = this.clickCnt + number;
    console.log("ClickNumberADD" + this.clickCnt);
    this.onClick.emit(this.clickCnt);
  }

  public getClickNumber(): number {
    console.log("ClickNumberGET" + this.clickCnt);

    return this.clickCnt;
  }
  // public doClick(){
  //   this.clickCnt++;
  //   this.onClick.emit(this.clickCnt);
  // }
}
