package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.dao.MentoDao;
import bitcamp.java89.ems2.domain.Member;
import bitcamp.java89.ems2.domain.Mento;
import bitcamp.java89.ems2.domain.Topic;
import bitcamp.java89.ems2.service.AuthService;
import bitcamp.java89.ems2.service.LikeService;

@RestController
public class AuthJsonControl {
  @Autowired AuthService authService;
  @Autowired LikeService likeService;
  @Autowired MentoDao mentoDao;
  
  @RequestMapping("/auth/login")
  public AjaxResult login(String email, String password,
      HttpServletResponse response, HttpSession session, Model model) throws Exception {
    System.out.println("/auth/login :" + email + "/" + password);
    
    Member member = authService.getMemberInfo(email, password);
    Mento mento = authService.getMentoInfo(email, password);
    
    if (member == null) {
      return new AjaxResult(AjaxResult.FAIL, "이메일 또는 암호가 틀리거나, 가입된 회원이 아닙니다.");
    }
    session.setAttribute("member", member); // HttpSession에 저장한다.
    
    int count = authService.getOne(member.getMemberNo()); // 들어온 애가 멘토인지~ 확인.
    if (count == 0) { // 멘토가 아니라면
        return new AjaxResult(AjaxResult.SUCCESS, member);
    }
    else { 
      return new AjaxResult(AjaxResult.SUCCESS, mento);
    }
  }

  @RequestMapping("/auth/logout")
  public AjaxResult logout(HttpSession session) throws Exception {
    session.invalidate(); // 기존 세션을 무효화시킨다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그아웃 성공입니다.");
  }

  @RequestMapping("/auth/loginUser")
  public AjaxResult loginUser(HttpSession session) throws Exception {
    Member member = (Member)session.getAttribute("member");
    System.out.println("/auth/loginUser :" + member);
    if (member == null) { // 로그인이 되지 않은 상태
      return new AjaxResult(AjaxResult.FAIL, "로그인을 하지 않았습니다.");
    } else {
      int memsType = authService.hasMento(member.getMemberNo());
      Topic topic = authService.getResult(member.getMemberNo());
      System.out.println("/auth/loginUser.topic :" + topic);
      List<String> topicName = authService.getResultNames(member.getMemberNo());
      System.out.println("/auth/loginUser.topicName :" + topicName);
      HashMap<String, Object> resultMap = new HashMap<>(); 
      int likeCount = likeService.hasLike(member.getMemberNo());
      if (topic == null) {
        resultMap.put("topic", member);
      } else {
        resultMap.put("topic", topic);
        resultMap.put("topicName", topicName);
      }
      System.out.println(memsType);
      System.out.println(likeCount);
      if (memsType != 0) resultMap.put("memsType", "mento");
      if (memsType == 0) resultMap.put("memsType", "mentee");
      if (likeCount != 0) resultMap.put("hasLike", "has");
      if (likeCount == 0) resultMap.put("hasLike", "none");
      return new AjaxResult(AjaxResult.SUCCESS, resultMap);
    }
  }
}