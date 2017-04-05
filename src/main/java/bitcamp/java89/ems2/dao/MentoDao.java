package bitcamp.java89.ems2.dao;

import java.util.ArrayList;
import java.util.Map;

import bitcamp.java89.ems2.domain.Member;
import bitcamp.java89.ems2.domain.Mento;

public interface MentoDao {
  int insert(Member member) throws Exception;
  int getOne(int memberNo) throws Exception;
  int count(String email) throws Exception;
  Mento getOneByEmailPassword(Map<String,String> paramMap) throws Exception;
  ArrayList<Mento> getList(Map<String,Object> paramMap) throws Exception;
  Mento getMentoInfo(int eno) throws Exception;
  ArrayList<Mento> getAreaList(int eno) throws Exception;
  
}
