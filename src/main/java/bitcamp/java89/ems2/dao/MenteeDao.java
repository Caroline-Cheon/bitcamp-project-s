package bitcamp.java89.ems2.dao;

import bitcamp.java89.ems2.domain.Member;

public interface MenteeDao {
  
/*  ArrayList<Member> getList() throws Exception;
  int countByEmail(String email) throws Exception;
  int countByEmailPassword(Map<String,String> paramMap) throws Exception;
  int insert(Member member) throws Exception;
  int delete(int memberNo) throws Exception;
  Member getOneByNo(int memberNo) throws Exception;
  Member getOne(String email) throws Exception;*/
  int insert(Member member) throws Exception;
  int count(String email) throws Exception;
  
}
