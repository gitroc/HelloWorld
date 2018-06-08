//
//  UiRNMainViewController.m
//  HelloWorld
//
//  Created by 宋军鹏 on 2018/6/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "UiRNMainViewController.h"
#import "UiRNUIView.h"

@interface UiRNMainViewController ()

@end

@implementation UiRNMainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.title = @"WxRN View 首页";
  UiRNUIView * uiRnView = [[UiRNUIView alloc] initWithFrame:self.view.bounds];
  self.view = uiRnView;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
