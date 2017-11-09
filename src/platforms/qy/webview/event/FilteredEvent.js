export function FilteredEvent(event){
    // filter loop object in event , so that event can be stringify to JSON
    function TouchListFilter( touchList , allowed ){
        let FilteredTouchList = []
        let i = event.changedTouches.length;
        while(i--){
            let cell = event.changedTouches[i];
            allowed.forEach((v)=>{
                (FilteredTouchList[i] = FilteredTouchList[i] || [])[v] = cell[v];
            })
        }
        return FilteredTouchList;
    }
    function TargetFilter( target , allowed ){
        let FilteredTarget = {}
        allowed.forEach((v)=>{
            FilteredTarget[v] = target[v];
        })
        FilteredTarget._uid = target.getAttribute('_uid')
        return FilteredTarget;
    }
    if(event.type.indexOf('touch') > -1){
        this.changedTouches = TouchListFilter( event.changedTouches , ['clientX','clientY','pageX','pageY'] )
        this.touches = TouchListFilter( event.touches , ['clientX','clientY','identifier','pageX','pageY'] )
    }
    this.currentTarget = TargetFilter( event.currentTarget , ['dataset','id','offsetLeft','offsetTop'] );
    this.detail = { value : event.target.value };
    this.target = TargetFilter( event.target , ['dataset','id','offsetLeft','offsetTop'] );
    this.timeStamp = event.timeStamp;
}
