package bitcamp.java89.ems2.service.impl;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.ContentsHeaderDao;
import bitcamp.java89.ems2.dao.MemberDao;
import bitcamp.java89.ems2.dao.MentoDao;
import bitcamp.java89.ems2.domain.Mento;
import bitcamp.java89.ems2.service.MentoService;

@Service
public class MentoServiceImpl implements MentoService {
  @Autowired ContentsHeaderDao contentsDao;
  @Autowired MemberDao memberDao;
  @Autowired MentoDao mentoDao;
  @Override
  public ArrayList<Mento> getList() throws Exception {
    // TODO Auto-generated method stub
    return null;
  }
  @Override
  public Mento getOneByEmailPassword(String email, String password) throws Exception {
    // TODO Auto-generated method stub
    return null;
  }
  @Override
  public int add(Mento mento) throws Exception {
    // TODO Auto-generated method stub
    return 0;
  }
  @Override
  public int update(Mento mento) throws Exception {
    // TODO Auto-generated method stub
    return 0;
  }
  @Override
  public int delete(int mentoNo) throws Exception {
    // TODO Auto-generated method stub
    return 0;
  }
  @Override
  public int updateProfile(HashMap<String, Object> map) throws Exception {
    // TODO Auto-generated method stub
    return 0;
  }
  @Override
  public Mento getMentoInfo(int eno) throws Exception {
    
    return mentoDao.getMentoInfo(eno);
  }
  @Override
  public ArrayList<Mento> getAreaList(int eno) throws Exception {
   
    return mentoDao.getAreaList(eno);
  }
  
 
  
 
}
















