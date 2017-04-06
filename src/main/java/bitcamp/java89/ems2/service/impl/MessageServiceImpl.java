package bitcamp.java89.ems2.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.MessageDao;
import bitcamp.java89.ems2.domain.Message;
import bitcamp.java89.ems2.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {
  @Autowired MessageDao messageDao;
  
  public int menteeSendQnA(Message message) throws Exception {
    return messageDao.menteeSendQnA(message);
  }
  
  public int menteeSendMesg(Message message) throws Exception {
    return messageDao.menteeSendMesg(message);
  }
  
  public int mentoSendMesg(Message message) throws Exception {
    return messageDao.mentoSendMesg(message);
  }
  
  public int hasQnA(Message message) throws Exception {
    return messageDao.hasQnA(message);
  }
  
  public int menteeVisit(Message message) throws Exception {
    return messageDao.menteeVisit(message);
  }
  
  public int mentoVisit(Message message) throws Exception {
    return messageDao.mentoVisit(message);
  }
  
  public List<Message> messageList(int cono, int sno) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("cono", cono);
    paramMap.put("sno", sno);
    
    return messageDao.messageList(paramMap);
  }

  @Override
  public List<Integer> conoList(int sno) throws Exception {
    
    return messageDao.conoList(sno);
  }

  @Override
  public ArrayList<Message> mentoInfo(HashMap<String, Object> targetMento) throws Exception {
    return messageDao.mentoInfo(targetMento);
  }

  @Override
  public int isMsg(HashMap<String, Object> targetMento) throws Exception {
    
    return messageDao.isMsg(targetMento);
  }

  @Override
  public Message mentoGetOne(HashMap<String, Object> targetMento) throws Exception {
    return messageDao.mentoGetOne(targetMento);
  }

  @Override
  public String getMessageNo(HashMap<String, Object> intMap) throws Exception {
    return messageDao.getMessageNo(intMap);
  }
  
  @Override
  public ArrayList<Integer> getMenteeNo(HashMap<String, Object> intMap) throws Exception {
   
    return messageDao.getMenteeNo(intMap);
  }
  
  
  @Override
  public String mentoGetMessageNo(HashMap<String, Object> intMap) throws Exception {
    return messageDao.mentoGetMessageNo(intMap);
  }

  @Override
  public int newMsgCount(HashMap<String, Object> intMap) throws Exception {
    return messageDao.newMsgCount(intMap);
  }
  
  @Override
  public int nodeNewMsgCount(HashMap<String, Object> intMap) throws Exception {
    return messageDao.nodeNewMsgCount(intMap);
  }

  @Override
  public Message nodeGetMessageNo(HashMap<String, Object> intMap) throws Exception {
    return messageDao.nodeGetMessageNo(intMap);
  }
  
  @Override
  public int menteeNewMsgCount(HashMap<String, Object> intMap) throws Exception {
    return messageDao.menteeNewMsgCount(intMap);
  }

  @Override
  public Message getMessageWriter(HashMap<String, Object> intMap) throws Exception {
    return messageDao.getMessageWriter(intMap);
  }


  
  
}
















