export const mockMenuData = [
    {
        "menuId": 1,
        "menuCode": "catalog_user_management",
        "menuName": "User Management",
        "menuType": 0,
        "menuUrl": null,
        "orderNum": 1,
        "parentMenuId": 0,
        "subMenuList": [
            {
                "menuId": 2,
                "menuCode": "menu_user",
                "menuName": "User",
                "menuType": 1,
                "menuUrl": "/portal/user/users",
                "orderNum": 1,
                "parentMenuId": 1,
                "subMenuList": []
            },
            {
                "menuId": 3,
                "menuCode": "menu_user_group",
                "menuName": "User Group",
                "menuType": 1,
                "menuUrl": "/portal/user/userGroup",
                "orderNum": 2,
                "parentMenuId": 1,
                "subMenuList": []
            },
            {
                "menuId": 4,
                "menuCode": "menu_role",
                "menuName": "Role",
                "menuType": 1,
                "menuUrl": "/portal/user/role",
                "orderNum": 3,
                "parentMenuId": 1,
                "subMenuList": []
            }
        ]
    },
    {
        "menuId": 5,
        "menuCode": "catalog_ticket_management",
        "menuName": "Ticket Management",
        "menuType": 0,
        "menuUrl": null,
        "orderNum": 2,
        "parentMenuId": 0,
        "subMenuList": [
            {
                "menuId": 6,
                "menuCode": "menu_ticket",
                "menuName": "Ticket List",
                "menuType": 1,
                "menuUrl": "/portal/ticket",
                "orderNum": 1,
                "parentMenuId": 5,
                "subMenuList": [
                    {
                        "menuId": 7,
                        "menuCode": "ticket:submit",
                        "menuName": "Submit",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 1,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 8,
                        "menuCode": "ticket:reassign",
                        "menuName": "Reassign",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 2,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 9,
                        "menuCode": "ticket:reject",
                        "menuName": "Reject",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 3,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 10,
                        "menuCode": "ticket:approve",
                        "menuName": "Approve",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 4,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 11,
                        "menuCode": "ticket:escalate",
                        "menuName": "Escalate",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 5,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 12,
                        "menuCode": "ticket:resubmit",
                        "menuName": "Re-submit",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 6,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 13,
                        "menuCode": "ticket:cancel",
                        "menuName": "Cancel",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 7,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 14,
                        "menuCode": "ticket:complete",
                        "menuName": "Complete",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 8,
                        "parentMenuId": 6,
                        "subMenuList": []
                    },
                    {
                        "menuId": 15,
                        "menuCode": "ticket:close",
                        "menuName": "Close",
                        "menuType": 2,
                        "menuUrl": null,
                        "orderNum": 9,
                        "parentMenuId": 6,
                        "subMenuList": []
                    }
                ]
            }
        ]
    }
]
