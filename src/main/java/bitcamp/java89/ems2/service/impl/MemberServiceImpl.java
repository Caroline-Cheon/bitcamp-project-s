package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.ContentsHeaderDao;
import bitcamp.java89.ems2.dao.MemberDao;
import bitcamp.java89.ems2.dao.MenteeDao;
import bitcamp.java89.ems2.dao.MentoDao;
import bitcamp.java89.ems2.domain.Member;
import bitcamp.java89.ems2.domain.Mentee;
import bitcamp.java89.ems2.domain.Mento;
import bitcamp.java89.ems2.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired ContentsHeaderDao contentsDao;
  @Autowired MemberDao memberDao;
  @Autowired MenteeDao menteeDao;
  @Autowired MentoDao mentoDao;
  
 
  
  /*public Member getDetail(int no) throws Exception {
    return memberDao.getOne(no);
  }
  
  public int add(Member member) throws Exception {
    
    if (memberDao.count(member.getEmail()) > 0) {
      throw new Exception("같은 학생의 이메일이 존재합니다. 등록을 취소합니다.");
    }
    
    if (memberDao.count(member.getEmail()) == 0) { 
      memberDao.insert(member);
      
    } else {
      Member member = memberDao.getOne(member.getEmail());
      member.setMemberNo(member.getMemberNo());
    }
    
    return memberDao.insert(member);
  }
  
  public int delete(int no) throws Exception {
    if (memberDao.countByNo(no) == 0) {
      throw new Exception("학생을 찾지 못했습니다.");
    }
    
    int count = memberDao.delete(no);

    if (managerDao.countByNo(no) == 0 && teacherDao.countByNo(no) == 0) {
      memberDao.delete(no);
    }
    
    return count;
  }
  */
  public Member getOne(int memberNo) throws Exception {
    return memberDao.getOne(memberNo);
    
  }
  
  
  public int update(Member member) throws Exception {
    System.out.println("업데이트멤버객체"+member);
    System.out.println("넘버"+member.getMemberNo());
    if (memberDao.countByNo(member.getMemberNo()) == 0) {
      throw new Exception("학생을 찾지 못했습니다.");
    }
    return memberDao.update(member);
  }

  @Override
  public int hasEmail(String email) throws Exception {
    return menteeDao.count(email); 
  }
  @Override
  public int addMentee(Mentee mentee) throws Exception {
    if (menteeDao.count(mentee.getEmail()) > 0) {
      throw new Exception("같은 학생의 이메일이 존재합니다. 등록을 취소합니다.");
    } 
    if (memberDao.count(mentee.getEmail()) == 0) { 
      memberDao.insert(mentee);
      
    } else {
      Member member = memberDao.getOneByEmail(mentee.getEmail());
      mentee.setMemberNo(member.getMemberNo());
    }
    
    return menteeDao.insert(mentee);
  }
  
  @Override
  public int addMento(Mento mento) throws Exception {
    
    if (mentoDao.count(mento.getEmail()) > 0) {
      throw new Exception("같은 학생의 이메일이 존재합니다. 등록을 취소합니다.");
    } 
    if (memberDao.count(mento.getEmail()) == 0) { 
      memberDao.insert(mento);
      
    } else {
      Member member = memberDao.getOneByEmail(mento.getEmail());
      mento.setMemberNo(member.getMemberNo());
    }
    
    return mentoDao.insert(mento);
  
 }

/*  @Override
  public int beMento(Mentee mentee) throws Exception {
    
    return mentoDao.insert(mentee);
  }*/
}
















