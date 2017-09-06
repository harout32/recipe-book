import { Directive, HostBinding, HostListener} from '@angular/core';


@Directive({
    selector:"[app-directive]"
})
export class Dropdown {
    @HostBinding('class.open') isOpen:boolean = false;
    @HostListener("click") toggleOpen(){
        this.isOpen = !this.isOpen;
    }
    constructor(){}

}