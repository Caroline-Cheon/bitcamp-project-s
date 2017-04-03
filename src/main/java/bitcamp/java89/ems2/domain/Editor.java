package bitcamp.java89.ems2.domain;

import javax.servlet.http.HttpServletRequest;

public class Editor extends ContentsHeader{
  private static final long serialVersionUID = 1L;
  
  private int rno;
  private String pno;
  private String keyvalue;
  private String pic="";
  private String chk;
  private String link="";
  private String video="";
  private String file;
  private String title;
  private String writer;
  private String data;
  private String thumbnail;
  private HttpServletRequest request;
  
  public int getRno() {
    return rno;
  }
  public void setRno(int rno) {
    this.rno = rno;
  }
  public String getPno() {
    return pno;
  }
  public void setPno(String pno) {
    this.pno = pno;
  }

  public String getKeyvalue() {
    return keyvalue;
  }
  public void setKeyvalue(String keyvalue) {
    this.keyvalue = keyvalue;
  }
  public String getFile() {
    return file;
  }
  public void setFile(String file) {
    this.file = file;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getWriter() {
    return writer;
  }
  public void setWriter(String writer) {
    this.writer = writer;
  }
  public String getData() {
    return data;
  }
  public void setData(String data) {
    this.data = data;
  }
  public String getThumbnail() {
    return thumbnail;
  }
  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }
  public HttpServletRequest getRequest() {
    return request;
  }
  public void setRequest(HttpServletRequest request) {
    this.request = request;
  }
  public String getPic() {
    return pic;
  }
  public void setPic(String pic) {
    this.pic = pic;
  }
  public String getLink() {
    return link;
  }
  public void setLink(String link) {
    this.link = link;
  }
  public String getVideo() {
    return video;
  }
  public void setVideo(String video) {
    this.video = video;
  }
  public String getChk() {
    return chk;
  }
  public void setChk(String chk) {
    this.chk = chk;
  }
  @Override
  public String toString() {
    return "Editor [rno=" + rno + ", pno=" + pno + ", keyvalue=" + keyvalue + ", pic=" + pic + ", chk=" + chk
        + ", link=" + link + ", video=" + video + ", file=" + file + ", title=" + title + ", writer=" + writer
        + ", data=" + data + ", thumbnail=" + thumbnail + ", request=" + request + "]";
  }
}
