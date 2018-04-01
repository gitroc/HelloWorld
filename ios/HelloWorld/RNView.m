//
//  RNView.m
//  HelloWorld
//
//  Created by roc on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNView.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation RNView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame {
  
  if (self = [super initWithFrame:frame]) {
#if TARGET_IPHONE_SIMULATOR
    [[RCTBundleURLProvider sharedSettings] setJsLocation:@"localhost"];
#else
    [[RCTBundleURLProvider sharedSettings] setDefaults];
#endif
    NSURL *jsCodeLocation;
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"App"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    
    [self addSubview:rootView];
    rootView.frame = self.bounds;
  }
  return self;
}

@end
