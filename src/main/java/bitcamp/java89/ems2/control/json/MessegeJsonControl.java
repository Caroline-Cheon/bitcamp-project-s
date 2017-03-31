package bitcamp.java89.ems2.control.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Message;
import bitcamp.java89.ems2.domain.Plan;
import bitcamp.java89.ems2.service.MessageService;
import bitcamp.java89.ems2.service.PlanService;

@RestController
public class MessegeJsonControl {
  @Autowired ServletContext sc;
  @Autowired MessageService messageService;
  @Autowired PlanService planService;
  
  @RequestMapping("/message/list")
  public AjaxResult list(@RequestParam int cono, @RequestParam int sno, @RequestParam int mno) throws Exception {
    List<Message> list = messageService.messageList(cono, sno);
    System.out.println("/message/list :" + list);
    
    Message message = new Message(); 
    message.setContentsNo(cono);
    message.setMemberNo(sno);
    
    HashMap<String,Object> resultMap = new HashMap<>(); 
    
    if (sno == mno) {
      messageService.menteeVisit(message);
      if (list == null) { // 멘티가 메세지 리스트를 가져올때 메세지 내용이 없다면
        Plan plan = planService.getOne(cono); // 내용이 없다면 멘토 이름과 사진만 리턴
        System.out.println(plan);
        resultMap.put("list", plan); 
        return new AjaxResult(AjaxResult.SUCCESS, resultMap);
      }
      
      Plan plan = planService.getOne(cono);
      resultMap.put("list", list); // 멘티가 메세지 리스트를 가져올때 메세지 내용이 있다면
      resultMap.put("mento", plan);
      return new AjaxResult(AjaxResult.SUCCESS, resultMap);
    }
   
    else { // 멘토라면 ~
      messageService.mentoVisit(message);
      if (list == null) { // 멘토가 채팅 modal을 띄웠을 때 메세지 내용이 없다면
        return new AjaxResult(AjaxResult.FAIL, "멘티와의 대화가 아직 없습니다.");    
      }    
    resultMap.put("list", list);
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
      
    }
     
  }
  
  @RequestMapping("/message/mentee-send")
  public AjaxResult send(@RequestParam String msge, @RequestParam int cono, @RequestParam int sno) throws Exception {
    Message message = new Message(); 
    message.setContentsNo(cono);
    message.setMemberNo(sno);
    message.setMessage(msge);
    message.setWriterNo(sno);
    
    int hasQna = messageService.hasQnA(message); 
    
    if (hasQna == 0) 
      messageService.menteeSendQnA(message);
    messageService.menteeSendMesg(message);
    return new AjaxResult(AjaxResult.SUCCESS, "success");
  }
  
  @RequestMapping("/message/mento-send")
  public AjaxResult send(@RequestParam String msge, @RequestParam int cono, @RequestParam int sno, int eno) throws Exception {
    Message message = new Message(); 
    message.setContentsNo(cono);
    message.setMemberNo(sno);
    message.setMessage(msge);
    message.setWriterNo(eno);
    
    messageService.mentoSendMesg(message);
    return new AjaxResult(AjaxResult.SUCCESS, "success");
  }
  
  @RequestMapping("/message/mento-list")
  public AjaxResult MentoMessageList(@RequestParam int sno) throws Exception {
   
   List<Integer> conoList = messageService.conoList(sno);
   ArrayList<Message> list = new ArrayList<Message>();
//   System.out.println(conoList.get(0)); // 5
//   System.out.println(conoList.size()); // 1
    for (int i = 0; i < conoList.size(); i++) {
      System.out.println(sno);
      HashMap<String, Object> targetMento = new HashMap<>(); 
      targetMento.put("sno", sno);
      targetMento.put("cono", conoList.get(i));
      list = messageService.mentoInfo(targetMento);
      
    }
   
    if (conoList == null || list == null) {
      return new AjaxResult(AjaxResult.FAIL, "Fail");
    }
    else {
      System.out.println("되거라"+list);
      return new AjaxResult(AjaxResult.SUCCESS, list);
     }
   
  }
  
  @RequestMapping("/message/isMsg")
  public AjaxResult isMessage(@RequestParam int cono, @RequestParam int sno) throws Exception {
    HashMap<String, Object> targetMento = new HashMap<>();
    targetMento.put("sno", sno);
    targetMento.put("cono", cono);
    
    int mswr = messageService.isMsg(targetMento);
    
    if (sno == mswr) {
      return new AjaxResult(AjaxResult.FAIL, "최신답변이 없음.");
    }
    else {

      Message message = messageService.mentoGetOne(targetMento);
      return new AjaxResult(AjaxResult.SUCCESS, message);
    }
    
  }
  
  @RequestMapping("/message/count")
  public AjaxResult newMessageCount(@RequestParam int sno) throws Exception {
    
    int msno = messageService.getMessageNo(sno);
    
    if (msno == 0) {
      return new AjaxResult(AjaxResult.FAIL, "최신 답변이 없습니다.");
    }
    else {
      
    int count = messageService.newMsgCount(msno, sno);
    
    return new AjaxResult(AjaxResult.SUCCESS, count);
    }
    
    
    
  }
  
  @RequestMapping("/message/menteeMessageCount")
  public AjaxResult menteeMessageCount(@RequestParam int cono, @RequestParam int mswr) throws Exception {
    HashMap<String, Object> intMap = new HashMap<>();
    intMap.put("cono", cono);
    intMap.put("mswr", mswr);
    
    String msno = messageService.mentoGetMessageNo(intMap);
    System.out.println("msno"+msno);
    
    if (msno == null) {
      return new AjaxResult(AjaxResult.FAIL, "최신 답변이 없습니다.");
    }
    else {
      intMap.put("msno", msno);
    int count = messageService.nodeNewMsgCount(intMap);
    System.out.println("멘토 node new message"+count);
    
    return new AjaxResult(AjaxResult.SUCCESS, count);
    }
    
    
    
  }
  
  
  
  
}