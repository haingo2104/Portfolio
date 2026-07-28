import { Component, ElementRef, HostListener, ViewChild, viewChildren } from '@angular/core';

@Component({
  selector: 'app-background-decor',
  templateUrl: './background-decor.component.html',
  styleUrl: './background-decor.component.scss',
})
export class BackgroundDecorComponent {
  readonly blobs = viewChildren<ElementRef<HTMLElement>>('blob');

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    this.blobs().forEach((blob, i) => {
      const factor = (i + 1) * 12;
      blob.nativeElement.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  }
}
