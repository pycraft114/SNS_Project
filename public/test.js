/**
 * Created by chanwoopark on 2017. 3. 30..
 */
//var a =[1,2,3];
//var b = a;
//a.push(4);
//console.log(b);

var a= [1,2,3];
var b = a;
var a = [1,2,3,4];
console.log(b);


/*


code----컴파일된 바이트 코드들이 들어가는 영역

data----전역변수 스태틱변수가 들어가는 영역

stack----지역변수 콜스택이 들어가는 영역     var a = new Constructor();      a  참조
                                                                     |
heap-----동적 할당 영역, 객체가 들어가는 영역                              object(new Constructor());

*/
