import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private componentSubject = new Subject<any>();

  component$ = this.componentSubject.asObservable();
  private loadedComponents: any[] = [];

  triggerComponentLoad(component: any){
    this.componentSubject.next(component);
    // this.loadedComponents.push(component); 
  }

  loadComponent(component: any, containerRef: ViewContainerRef, data?:any) {
    containerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const dynamicComponentRef = containerRef.createComponent<any>(componentFactory);

    return dynamicComponentRef;
  }

  loadUserComponent(component: any, containerRef: ViewContainerRef, user?:any)
  {
    containerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const dynamicComponentRef = containerRef.createComponent<any>(componentFactory);

    // input property named 'user'
    dynamicComponentRef.instance.user = user;

    return dynamicComponentRef;

  }

  loadGroupComponent(component:any,containerRef:ViewContainerRef,group?:any){
    containerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const dynamicComponentRef = containerRef.createComponent<any>(componentFactory);

    // input property named 'group'
    dynamicComponentRef.instance.group = group;

    return dynamicComponentRef;

  }

  getLatestLoadedComponent(): any {
    return this.loadedComponents.length > 0 ? this.loadedComponents[this.loadedComponents.length - 1] : null;
  }
}
