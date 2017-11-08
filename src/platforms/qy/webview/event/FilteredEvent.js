export function FilteredEvent(event){
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

    //checkbox-group
    if(/mp-checkbox-group/.test(event.currentTarget.className)){
        this.detail = {value : []}
        event.currentTarget.querySelectorAll('input[type="checkbox"]:checked').forEach(checkboxDom => {
            this.detail.value.push(checkboxDom.value)
        })
    }else if(/mp-switch/.test(event.currentTarget.className)){
        this.detail = {value : event.currentTarget.checked};
    }else{
        this.detail = { value : event.target.value }
    }
    this.target = TargetFilter( event.target , ['dataset','id','offsetLeft','offsetTop'] );
    this.timeStamp = event.timeStamp;
}
