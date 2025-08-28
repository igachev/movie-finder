import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgModal]'
})
export class ImgModalDirective implements AfterViewInit {
   modalContainer!: HTMLDivElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

   }

   // ngAfterViewInit because I will need the src attribute of the image and I need it to be loaded.
   // Otherwise src is empty!!!
  ngAfterViewInit(): void {
   const parentElement = this.el.nativeElement.parentElement;

   let img = this.renderer.createElement('img');
  //  console.log(this.el.nativeElement.src);
   this.renderer.setAttribute(img,'src',this.el.nativeElement.src);

   const xButton = this.renderer.createElement('span');
   xButton.innerText = "x"
   this.modalContainer = this.renderer.createElement('div');

   this.renderer.addClass(this.modalContainer,"modal-container");
   this.renderer.addClass(img,"modal-img");
   this.renderer.addClass(xButton,"close-btn");

   this.renderer.listen(xButton, 'click', () => {
  this.renderer.setStyle(this.modalContainer, 'display', 'none');
      });

   this.renderer.appendChild(this.modalContainer,img)
   this.renderer.appendChild(this.modalContainer,xButton)
   this.renderer.appendChild(parentElement,this.modalContainer)
  }

   @HostListener("click") onMouseClick() {
        this.renderer.setStyle(this.modalContainer,'display','block')
   }

}
