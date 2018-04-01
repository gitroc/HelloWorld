//
//  RNBridgeModule.m
//  HelloWorld
//
//  Created by roc on 2018/3/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNBridgeModule.h"
#import "React/RCTBridge.h"
#import <AddressBook/AddressBookDefines.h>
#import <AddressBook/ABRecord.h>
#import <AddressBook/AddressBook.h>

static NSString * const kConstEventName = @"我是一个常量，我来自Native";
static NSString * const kEventEmitter  = @"kEventEmitter";


@implementation RNBridgeModule

@synthesize bridge = _bridge;

//此处不能使用OC的字符串，直接输入就行了
RCT_EXPORT_MODULE(RNBridgeModule);

//RN传参数调用原生OC,并且返回数据给RN  通过CallBack
RCT_EXPORT_METHOD(handleCallback:(NSString *)msg callback:(RCTResponseSenderBlock)callback){
  NSLog(@"接收到RN传过来的数据为:%@",msg);
  NSArray *events = [[NSArray alloc] initWithObjects:msg,@"李四", nil];
  callback(@[events]);
}

//RN传参数调用原生OC,并且返回数据给RN  通过Promise
RCT_EXPORT_METHOD(handlePromise:(NSString *)msg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  NSLog(@"接收到RN传过来的数据为:%@", msg);
  if([msg isEqualToString:@"i will be promise"]){
    resolve(msg);
  }else{
//    NSError *error=[NSError errorWithDomain:@"传入的name不符合要求,回调失败啦,Promise..." code:100 userInfo:nil];
//    reject(@"100",@"传入的name不符合要求,回调失败啦,Promise...",error);
//
    reject(@"-1001", @"i will be ", nil);
  }
}

RCT_EXPORT_METHOD(rnCallNative:(NSString *)phone) {
  
  NSLog(@"接收到RN传过来的数据为:%@", phone);
  
  NSString *callPhone = [NSString stringWithFormat:@"telprompt://%@", phone];
  /// 解决iOS10及其以上系统弹出拨号框延迟的问题
  /// 方案一
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
    /// 10及其以上系统
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:callPhone] options:@{} completionHandler:nil];
  } else {
    /// 10以下系统
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:callPhone]];
  }
}

RCT_EXPORT_METHOD(handleMessage:(NSString *) msg) {
  NSLog(@"接收到RN传过来的数据为:%@", msg);
  // 2. 获取所有联系人
  ABAddressBookRef addressBookRef = ABAddressBookCreate();
  CFArrayRef arrayRef = ABAddressBookCopyArrayOfAllPeople(addressBookRef);
  long count = CFArrayGetCount(arrayRef);
  NSString * msgStr = nil;
  for (int i = 0; i < count; i++) {
    //获取联系人对象的引用
    ABRecordRef people = CFArrayGetValueAtIndex(arrayRef, i);
    
    //获取当前联系人名字
    NSString *firstName=(__bridge NSString *)(ABRecordCopyValue(people, kABPersonFirstNameProperty));
    
    //获取当前联系人姓氏
    NSString *lastName=(__bridge NSString *)(ABRecordCopyValue(people, kABPersonLastNameProperty));
    NSLog(@"--------------------------------------------------");
//    NSLog(@"firstName=%@, lastName=%@", firstName, lastName);
    
    msgStr = [NSString stringWithFormat:@"{姓名: %@%@,电话号码:", firstName, lastName];
    ABMultiValueRef phones = ABRecordCopyValue(people, kABPersonPhoneProperty);
    for (NSInteger j=0; j<ABMultiValueGetCount(phones); j++) {
      NSString *phone = (__bridge NSString *)(ABMultiValueCopyValueAtIndex(phones, j));
      NSLog(@"phone=%@", phone);
      msgStr = [msgStr stringByAppendingFormat:@"%@}",phone];
    }
//    NSLog(@"msgStr=%@", msgStr);
  }
  
  NSLog(@"msgStr=%@", msgStr);
  [self sendEventWithName:kEventEmitter
                     body:msgStr];
}

//常量
- (NSDictionary *)constantsToExport {
  return @{ @"CONSTVALUE" : kConstEventName,
            @"kEventEmitter": kEventEmitter};
}

- (NSArray<NSString *> *)supportedEvents {
  return @[kEventEmitter];//有几个就写几个
}

//- (void)startObserving
//{
//  [[NSNotificationCenter defaultCenter] addObserver:self
//                                           selector:@selector(emitEventInternal:)
//                                               name:@"event-emitted"
//                                             object:nil];
//}
//- (void)stopObserving
//{
//  [[NSNotificationCenter defaultCenter] removeObserver:self];
//}
//
//- (void)emitEventInternal:(NSNotification *)notification
//{
//  [self sendEventWithName:kEventEmitteriOS
//                     body:notification.object];
//}


@end
