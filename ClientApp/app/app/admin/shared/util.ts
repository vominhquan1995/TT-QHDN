export class UtilFunction {
    public static delayAction(time: number, action: () => void = () => { }) {
        setTimeout(() => {
            action();
        }, time)
    }
    // public static parseSalary(input: number): string {
    //     //đếm số lần lặp 
    //     let i = Math.ceil(input.toString().length / 3);
    //     // console.log('i' + i);
    //     //tính số kí tự thừa
    //     let j = input.toString().length - (parseInt((input.toString().length / 3).toString(), 10) * 3);
    //     // console.log('j' + j);
    //     //khởi tại vị trí kết thúc là số kí tự thừa
    //     let start = 0;
    //     let end = 0;
    //     if (j == 0) {
    //         end = 3;
    //     } else {
    //         end = j;
    //     }
    //     let params = [];
    //     for (var k = 0; k < i; k++) {
    //         params.push(input.toString().substring(start, end))
    //         //vị trí bắt đầu lần tiếp theo bằng vị trí kết thúc trước, vị trí kết thúc tăng thêm 3
    //         start = end;
    //         end = end + 3;
    //     }
    //     return params.join('.') + ' VNĐ';
    // }
}