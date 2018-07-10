//
//  WxRNMainViewController.m
//  SmartGClub
//
//  Created by roc on 2018/4/1.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "WxRNMainViewController.h"
#import "WxRNView.h"

@interface WxRNMainViewController ()

@end

@implementation WxRNMainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.title = @"WxRN View 首页";
  WxRNView * wxRnView = [[WxRNView alloc] initWithFrame:self.view.bounds];
  self.view = wxRnView;
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
