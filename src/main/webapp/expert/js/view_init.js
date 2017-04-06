function view_init() {
    var $ = go.GraphObject.make;
    myDiagram =
      $(go.Diagram, "viewDiagramDiv",
        {
    //마인맵 영역 설정
          "commandHandler.copiesTree": true, //복사 가능한 트리 구조
          "commandHandler.deletesTree": true, //삭제 가능한 트리 구조
          "draggingTool.dragsTree": true, // 드래그 가능한 트리 구조
          initialContentAlignment: go.Spot.Center,  // 최초 로드시 마인드 맵 중앙 위치
          "undoManager.isEnabled": false // undo/redo 기능 
        });
    
    
    
    
    // 수정이 되었을경우 브라우저 title 뒤쪽게  '*'을 추가
    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });
    
    
    
    
    // 각 요소를 규정하는 스크립트 (텍스트와 라인 /아이콘 으로 구정되어있음)
    
    myDiagram.nodeTemplate =
      $(go.Node, "Vertical", // 세로 구조
        { selectionObjectName: "TEXT" },
        
        //텍스트 부분
       
     $(go.Panel, "Auto",     
     //라인 부분     
     $(go.Shape, "RoundedRectangle",
          {
          name:"brush",
          stroke:"black",
          fill:"black",
          stretch: go.GraphObject.Horizontal,
            strokeWidth: 1,
            
            //라인 포트를 규정함 (현재는 좌우 포트로 선이 연결됨)
            portId: "", fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
          },
                 
          new go.Binding("stroke", "brush").makeTwoWay(), // 선색을 저장함
          new go.Binding("fill", "color").makeTwoWay(), // 내부색을 저장함
          
          //선의 출발지와 도착지에 대한 규정
          new go.Binding("fromSpot", "dir", function(d) { return spotConverter(d, true); }),
          new go.Binding("toSpot", "dir", function(d) { return spotConverter(d, false); })),
          
          $(go.TextBlock,
                  {margin:2,
                    name: "TEXT",
                    stroke:"white",
                    minSize: new go.Size(30, 15),
                    maxSize: new go.Size(200, NaN),
                    editable: false
                  },
                  
                  //글자의 크기와 글꼴을 기억하게 함
                  new go.Binding("text", "text").makeTwoWay(),
                  new go.Binding("scale", "scale").makeTwoWay(),
                  new go.Binding("font", "font").makeTwoWay())
          
          
          ),
        //아이콘에 대한 부분
          $(go.Panel, "Table", //테이블 구조
            
            $(go.Picture, "/img/pic.png",
                    {name:"pic",
                  row: 0, column: 0, margin: 2, //테이블 상 위치 지정
                  maxSize: new go.Size(20, 17), //사이즈
                    visible: false , //기본적으로 표시하지 않음
                    click: function(e, obj) { imgpopup(obj.part.data.key); }}, //클릭 이벤트
                    
                  new go.Binding("visible", "pic", function(i) { return i ? true : false; }).makeTwoWay()), //아이콘을 표시할지를 저장함
            
              
              $(go.Picture, "/img/mov.png",
                    {name:"video",
                  row: 0, column: 1, margin: 2,
                  maxSize: new go.Size(20, 17),
                    visible: false,
                    click: function(e, obj) { videopopup(obj.part.data.key); }},
              
                    new go.Binding("visible", "video", function(i) { return i ? true : false; }).makeTwoWay()),
            
              
              $(go.Picture, "/img/url.png",
                    {name:"link",
                  row: 0, column: 2, margin: 2,
                  maxSize: new go.Size(20, 17),
                    visible: false,
                    click: function(e, obj) { linkpopup(obj.part.data.key); } },                    
              
                    new go.Binding("visible", "link", function(i) { return i ? true : false; }).makeTwoWay())            
              ),
       
        //위치 정보를 기억함 (중앙 기준)
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),        
        new go.Binding("locationSpot", "dir", function(d) { return spotConverter(d, false); })
        
      );
    
    

    
    
    // 각 요소에 선택시 표시되는 부분을 규정하는 스크립트
    
    myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          // 선택시 dodgerblue색 사각형이 형성됨 
          $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
          $(go.Placeholder)
        ) 
      );
      
      
  
    
    
    // 선과 선을 연결 하는 링크 규정 스크립트
    myDiagram.linkTemplate =
      $(go.Link,
        {
        curve: go.Link.Bezier,
          fromShortLength: -2,
          toShortLength: -2,
          selectable: false
        },
        $(go.Shape, // 기본적으로 선의 색을 따라 간다 선의 색이 규정되지 않으면 기본 검정
          { name:"link",strokeWidth: 3},
          new go.Binding("stroke", "toNode", function(n) {
            if (n.data.brush) return n.data.brush;
            return "black";
          }).ofObject())
      );
    
    
    
    
    //선택된 요소의 이동을 규정한 스크립트 / 좌우로 이동 했을 경우 시작되는 root 부분을 규정 한다
    myDiagram.addDiagramListener("SelectionMoved", function(e) {
      var rootX = myDiagram.findNodeForKey(0).location.x;
      myDiagram.selection.each(function(node) {
          if (node.data.parent !== 0) return;  
          var nodeX = node.location.x;
          if (rootX < nodeX && node.data.dir !== "right") {
            updateNodeDirection(node, "right");
          } else if (rootX > nodeX && node.data.dir !== "left") {
            updateNodeDirection(node, "left");
          }
          layoutTree(node);
        });
    });
    // 페이지에 저장된 json 형식의 데이터를 불러와 디스플레이 영역에 표시 한다 - 추후 DB 연결로 변경 예정
    view_load();
  }
  
  
  
  //선의 출발지와 도착지를 리턴하는 함수
  function spotConverter(dir, from) {
    if (dir === "left") {
      return (from ? go.Spot.Left : go.Spot.Right);
    } else {
      return (from ? go.Spot.Right : go.Spot.Left);
    }
  }
  
  
  //각 자식 요소의 방향을 갱신 하는 함수
  function updateNodeDirection(node, dir) {
    myDiagram.model.setDataProperty(node.data, "dir", dir);
    // 자식 요소의 방향을 재귀적으로 갱신한다
    var chl = node.findTreeChildrenNodes(); //자식 요소의 반복자
    while(chl.next()) {
      updateNodeDirection(chl.value, dir);
    }
  }
  
 
  
  //트리 구조에서 해당 요소를 어디에 추가 할지를 선택하는  함수
  function layoutTree(node) {
    if (node.data.key === 0) { //root에서 시작인지  
      layoutAll();  
    } else { // 아니면 부모에서 시작인지
      var parts = node.findTreeParts();
      layoutAngle(parts, node.data.dir === "left" ? 180 : 0);
    }
  }
  
  
  
  function layoutAngle(parts, angle) {
    var layout = go.GraphObject.make(go.TreeLayout,
        { angle: angle,
          arrangement: go.TreeLayout.ArrangementFixedRoots,
          nodeSpacing: 5,
          layerSpacing: 20,
          setsPortSpot: false, // 따로 함수을 분기함 기본이true이므로 false로 규정함 수정 불가!
          setsChildPortSpot: false });
    layout.doLayout(parts);
  }
  
  
  
  function layoutAll() {
    var root = myDiagram.findNodeForKey(0);
    if (root === null) return;
//     myDiagram.startTransaction("Layout");
    
    var rightward = new go.Set(go.Part);
    var leftward = new go.Set(go.Part);
    root.findLinksConnected().each(function(link) {
        var child = link.toNode;
        if (child.data.dir === "left") {
          leftward.add(root);  
          leftward.add(link);
          leftward.addAll(child.findTreeParts());
        } else {
          rightward.add(root);
          rightward.add(link);
          rightward.addAll(child.findTreeParts());
        }
      });
        layoutAngle(rightward, 0);
    layoutAngle(leftward, 180);
//     myDiagram.commitTransaction("Layout");
  }
  function view_load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("viewSavedModel").value);
  }