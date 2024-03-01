import {Coordinates} from "../Inputs/Context";

class Printer{
    SIZE = 408;
    LINE_WIDTH = 2;
    TEXT_LINE_HEIGHT = 3;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    lastR: number | undefined;
    dots: Array<Coordinates> | undefined;
    fetchCoordinates: (x: number, y: number, r: number) => void;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D,
                r: number | undefined, dots: Array<Coordinates> | undefined, fetchCoordinates: (x: number, y: number, r: number) => void) {
        this.canvas = canvas;
        this.ctx = context;
        this.lastR = r;
        this.dots = dots;
        this.fetchCoordinates = fetchCoordinates;
    }

    drawStart() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.lastR && this.lastR > 0 && this.lastR <= 5) this.drawGraph(this.lastR);
        this.drawAxes();
        this.setPointerAtDot(0.5);
        this.setPointerAtDot(1);
        this.setPointerAtDot(1.5);
        this.setPointerAtDot(2);
        this.setPointerAtDot(2.5);
        this.setPointerAtDot(3);
        this.setPointerAtDot(3.5);
        this.setPointerAtDot(4);
        this.setPointerAtDot(4.5);
        this.setPointerAtDot(5);
        if (this.lastR && this.lastR > 0 && this.lastR <= 5) this.drawPoints(this.lastR); //lastRR);//

    }

    drawAxes() {
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "black";
        this.drawArrow(this.TEXT_LINE_HEIGHT * 5, this.SIZE / 2, this.SIZE - this.TEXT_LINE_HEIGHT  * 5, this.SIZE / 2);
        this.drawArrow( this.SIZE / 2, this.SIZE - this.TEXT_LINE_HEIGHT * 5, this.SIZE / 2, this.TEXT_LINE_HEIGHT * 5);

        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`X`, this.SIZE - this.TEXT_LINE_HEIGHT * 5, this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 5);
        this.ctx.fillText(`Y`, this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 5, this.TEXT_LINE_HEIGHT * 5);
    }


    setPointerAtDot(max_r = 3) {
        const points = 12;
        const pixels = this.SIZE / points;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.strokeStyle = "black";
        if (max_r != 1.5 && max_r != 2.5 && max_r != 3.5 && max_r != 4.5 && max_r != 0.5) {
            this.ctx.beginPath()
            this.ctx.lineWidth = this.LINE_WIDTH / 2.3;
            this.ctx.moveTo(this.SIZE / 2 + pixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
            this.ctx.lineTo(this.SIZE / 2 + pixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
            this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pixels * max_r);
            this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pixels * max_r);
            this.ctx.moveTo(this.SIZE / 2 - pixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
            this.ctx.lineTo(this.SIZE / 2 - pixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
            this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 + pixels * max_r);
            this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 + pixels * max_r);
            this.ctx.stroke();
            this.ctx.fillText(max_r.toString(), this.SIZE / 2 + pixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 5);
            this.ctx.fillText(max_r.toString(), this.SIZE / 2 - this.TEXT_LINE_HEIGHT * 5, this.SIZE / 2 - pixels * max_r);
            this.ctx.fillText((max_r * (-1)).toString(), this.SIZE / 2 - pixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 5);
            this.ctx.fillText((max_r * (-1)).toString(), this.SIZE / 2 - this.TEXT_LINE_HEIGHT * 5, this.SIZE / 2 + pixels * max_r);
        } else {
            this.ctx.beginPath()
            this.ctx.lineWidth = this.LINE_WIDTH / 2.3;
            this.ctx.moveTo(this.SIZE / 2 + pixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 2 / 3);
            this.ctx.lineTo(this.SIZE / 2 + pixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT * 2 / 3);
            this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 2 / 3, this.SIZE / 2 - pixels * max_r);
            this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT * 2 / 3, this.SIZE / 2 - pixels * max_r);
            this.ctx.moveTo(this.SIZE / 2 - pixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 2 / 3);
            this.ctx.lineTo(this.SIZE / 2 - pixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT * 2 / 3);
            this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT * 2 / 3, this.SIZE / 2 + pixels * max_r);
            this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT * 2 / 3, this.SIZE / 2 + pixels * max_r);
            this.ctx.stroke();
        }
    }

    drawArrow(fromx:number, fromy:number, tox:number, toy:number) {
        var headlen = 12; // length of head in pixels 10
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.lineWidth = this.LINE_WIDTH;
        this.ctx.moveTo(fromx, fromy);
        this.ctx.lineTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    drawGraph(r:number){
        if (r != null) {
            this.lastR = r;
            const points = 12;
            const pixels = this.SIZE / points;
            this.ctx.fillStyle = '#dfd3e3';
            this.ctx.strokeStyle = "#dfd3e3";
            this.ctx.beginPath();
            this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + r * pixels);
            this.ctx.lineTo(this.SIZE / 2 - r * pixels, this.SIZE / 2 + r * pixels);
            this.ctx.lineTo(this.SIZE / 2 - r * pixels, this.SIZE / 2);
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
            this.ctx.lineTo(this.SIZE / 2 + r * pixels / 2, this.SIZE / 2);
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + r * pixels / 2);
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
            this.ctx.fill();


            this.ctx.beginPath();
            this.ctx.arc(
                this.SIZE / 2,
                this.SIZE / 2,
                r * pixels,
                Math.PI,
                Math.PI * 3 / 2,
                false
            );
            this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    drawPoint(x:number, y:number, r:number, success=true, r1:number) {
        if (r1 != null) {
            x *= r1 / r;
            y *= r1 / r;
        }
        this.ctx.fillStyle = success
            ? "#36f57f"
            : "#ff2400";
        const points = 10; // 12
        const pixels = this.SIZE / points;
        this.ctx.beginPath();
        this.ctx.arc(
            this.SIZE / 2 + pixels * x,
            this.SIZE / 2 - y * pixels,
            3,
            0,
            Math.PI * 2,
        );
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = success
            ? "#227442"
            : "#990000";
        this.ctx.lineWidth = 1.5;
        this.ctx.arc(
            this.SIZE / 2 + pixels * x,
            this.SIZE / 2 - y * pixels,
            3,
            0,
            Math.PI * 2
        );
        this.ctx.stroke();
    }

    drawPoints(r1:number) {
        if (this.dots && this.lastR && this.lastR > 0) {
                this.dots.forEach(dot => {
                this.drawPoint(Number(dot.x), Number(dot.y), Number(dot.r), dot.success, r1)
            })
        }
    }
}

export default Printer;