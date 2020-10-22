import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mapnetwork',
  templateUrl: './mapnetwork.component.html',
  styleUrls: ['./mapnetwork.component.scss']
})
export class MapnetworkComponent implements OnInit, AfterViewInit {

  @ViewChild('MapCanvas')
  public canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private p1 = new Path2D();

  private BB: DOMRect;
  private offsetX: any;
  private offsetY: any;
  private WIDTH = 0;
  private HEIGHT = 0;

  // drag related variables
  private dragok = false;
  private startX: any;
  private startY: any;

  // an array of objects that define different shapes
  private shapes = [];

  constructor() {}

  ngAfterViewInit(): void {
    // define ctx element
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.BB = this.canvas.nativeElement.getBoundingClientRect();
    this.offsetX = this.BB.left;
    this.offsetY = this.BB.top;
    this.WIDTH = this.canvas.nativeElement.width;
    this.HEIGHT = this.canvas.nativeElement.height;

    console.log(this.offsetX);

    // define 2 rectangles
    this.shapes.push({x: 10, y: 100, width: 30, height: 30, fill: '#444444', isDragging: false});
    this.shapes.push({x: 80, y: 100, width: 30, height: 30, fill: '#ff550d', isDragging: false});
    // define 2 circles
    this.shapes.push({x: 150, y: 100, r: 10, fill: '#800080', isDragging: false});
    this.shapes.push({x: 200, y: 100, r: 10, fill: '"#0c64e8', isDragging: false});

    // listen for mouse events
    this.canvas.nativeElement.onmousedown = this.onCanvasMouseDown;
    this.canvas.nativeElement.onmouseup = this.onCanvasMouseUp;
    this.canvas.nativeElement.onmousemove = this.onCanvasMouseMove;

    // call to draw the scene
    this.draw();
  }

  ngOnInit(): void {

  }

  // draw a single rect
  rect(r: { fill: string | CanvasGradient | CanvasPattern; x: number; y: number; width: number; height: number; }): void {
    this.ctx.fillStyle = r.fill;
    this.ctx.fillRect(r.x, r.y, r.width, r.height);
  }

  // draw a single rect
  circle(c: { fill: string | CanvasGradient | CanvasPattern; x: number; y: number; r: number; }): void {
    this.ctx.fillStyle = c.fill;
    this.ctx.beginPath();
    this.ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  // clear the canvas
  clear(): void {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  // redraw the scene
  draw(): void {
    this.clear();
    // redraw each shape in the shapes[] array
    // tslint:disable-next-line: forin
    for (const i in this.shapes) {
      const shape = this.shapes[i];
      // decide if the shape is a rect or circle
      // (it's a rect if it has a width property)
      if (shape.width) {
        this.rect(shape);
      }
      else {
        this.circle(shape);
      }
    }
  }


  onCanvasMouseMove(e: MouseEvent): void {
    // if we're dragging anything...
    if (this.dragok){

      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      const mx = e.clientX - this.offsetX;
      const my = e.clientY - this.offsetY;

      // calculate the distance the mouse has moved
      // since the last mousemove
      const dx = mx - this.startX;
      const dy = my - this.startY;

      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      // tslint:disable-next-line: forin
      for (const i in this.shapes) {
        const shape = this.shapes[i];
        if (shape.isDragging){
          shape.x += dx;
          shape.y += dy;
        }
      }

      // redraw the scene with the new rect positions
      this.draw();

      // reset the starting mouse position for the next mousemove
      this.startX = mx;
      this.startY = my;
    }
  }

  onCanvasMouseUp(e: MouseEvent): void {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    this.dragok = false;
    // tslint:disable-next-line: forin
    for (const i in this.shapes) {
      const shape = this.shapes[i];
      shape.isDragging = false;
    }
  }

  private onCanvasMouseDown(e: MouseEvent): void {
    console.log(this.startX);
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = e.clientX - this.offsetX;
    const my = e.clientY - this.offsetY;

    // test each shape to see if mouse is inside
    this.dragok = false;
    // tslint:disable-next-line: forin
    for (const i in this.shapes) {
      const shape = this.shapes[i];
      // decide if the shape is a rect or circle
      if (shape.width){
        // test if the mouse is inside this rect
        if ( mx > shape.x && mx < shape.x + shape.width && my > shape.y && my < shape.y + shape.height) {
        // if yes, set that rects isDragging=true
          this.dragok = true;
          shape.isDragging = true;
        }
      }
      else  {
        const dx = shape.x - mx;
        const dy = shape.y - my;
        // test if the mouse is inside this circle
        if (dx * dx + dy * dy < shape.r * shape.r){
          this.dragok = true;
          shape.isDragging = true;
        }
      }
    }
    console.log(this.offsetX);
    // save the current mouse position
    this.startX = mx;
    this.startY = my;
  }

}
