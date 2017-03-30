var serverRoot = 'http://localhost:8080/bitcamp-project-s';
var clientRoot = '/bitcamp-project-s'

/*   click 이벤트 조건 제어를 위한 글로벌 변수   */
var loginEvent = false;
var testEvent = false;

/*   wheel 이벤트 제어를 위한 글로벌 변수   */
var slideState = false;

/*   user session 정보   */
var memberInfo; 
var topicName;
var hasLike;
var sno;

/*   pageBtn 제어 변수   */
var currPageNo;
var pageSize;
var maxPageNo;
