export class LinearRegression {
    slope: number = 0
    intercept: number = 0
    constructor(values: number[]) {
        let sumx: number = 0, sumy: number = 0
        values.forEach((v, i) => {
            sumx += i
            sumy += v
        })

        let xbar = sumx / values.length
        let ybar = sumy / values.length

        let xxbar = 0, xybar = 0
        values.forEach((y, x) => {
            xxbar += (x - xbar) * (x - xbar)
            xybar += (x - xbar) * (y - ybar)
        })

        this.slope = xybar / xxbar
        this.intercept = ybar - this.slope * xbar
    }

    public predict(v: number): number {
        return this.slope * v + this.intercept
    }
}