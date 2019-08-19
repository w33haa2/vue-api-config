const version = "v1";
/**
 * API routes mapping consuming the provided backend API.
 */
const api = {
  $children: {
    //region Auth
    auth: {
      $prefix: "auth",

      login: {
        $url: "login",
        $method: "POST"
      },
      logout: {
        $url: "logout",
        $method: "GET"
      },
      user: {
        $url: "user",
        $method: "GET"
      }
      //endregion Auth
    },
    api: {
      //region API paths
      $prefix: `api/${version}`,
      $children: {
        //region Projects
        projects: {
          $prefix: "projects",

          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          import: {
            $url: "import",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },
          search: {
            $url: "search",
            $method: "GET"
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["id"],
            $format: Template(() => `fetch/${id}`)
          },
          projectIssues: {
            $url: "project-issues",
            $method: "GET",
            $requires: ["project_id"],
            $format: Template(() => `${project_id}/project-issues`)
          },

          $children: {
            //region Dashboard
            dashboard: {
              $prefix: "dashboard",

              fetch: {
                $url: "",
                $method: "GET"
              }
            },
            //end region Dashboard

            //region Reporting
            reporting: {
              $prefix: "reporting",
              $children: {
                //region Progress
                progress: {
                  $prefix: "progress",

                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  delete: {
                    $url: "delete",
                    $method: "POST",
                    $requires: ["id"],
                    $format: Template(() => `delete/${id}`)
                  }
                },
                scurve: {
                  $prefix: "scurve",

                  fetchAll: {
                    $url: "",
                    $method: "GET"
                  },
                  fetch: {
                    $url: "fetch",
                    $method: "GET",
                    $requires: ["scurve_id"],
                    $format: Template(() => `fetch/${scurve_id}`)
                  },
                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  update: {
                    $url: "update",
                    $method: "POST",
                    $requires: ["scurve_id"],
                    $format: Template(() => `update/${scurve_id}`)
                  },
                  delete: {
                    $url: "delete",
                    $method: "POST",
                    $requires: ["scurve_id"],
                    $format: Template(() => `delete/${scurve_id}`)
                  },
                  project: {
                    $url: "project",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `project/${project_id}`)
                  },
                  latest: {
                    $url: "latest",
                    $method: "GET"
                  }
                },
                //endregion Progress

                //region generator
                generator: {
                  $prefix: "generator",
                  $children: {
                    pdf: {
                      $prefix: "pdf",
                      $children: {
                        financial: {
                          $prefix: "financial",

                          balanceSheet: {
                            $url: "balance-sheet/fetch",
                            $method: "GET"
                          },
                          incomeStatement: {
                            $url: "income-statement/fetch",
                            $method: "GET"
                          }
                        },
                        accomplishment: {
                          $prefix: "accomplishment",

                          fetch: {
                            $url: "fetch",
                            $method: "GET",
                            $requires: ["id"],
                            $format: Template(() => `fetch/${id}`)
                          }
                        }
                      }
                    },
                    csv: {
                      $prefix: "csv",
                      $children: {
                        financial: {
                          $prefix: "financial",

                          inhouseEstimate: {
                            $url: "inhouse-estimate/fetch",
                            $method: "GET",
                            $requires: ["contract_key"],
                            $format: Template(
                              () => `inhouse-estimate/fetch/${contract_key}`
                            )
                          }
                        }
                      }
                    }
                  }
                }
                //endregion generator
              }
            },
            //endregion Reporting

            //region Finances
            finances: {
              $prefix: "finances",
              $children: {
                billing: {
                  $prefix: "billing",

                  fetchAll: {
                    $url: "",
                    $method: "GET"
                  },
                  fetch: {
                    $url: "fetch",
                    $method: "GET",
                    $requires: ["billing_id"],
                    $format: Template(() => `fetch/${billing_id}`)
                  },
                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  update: {
                    $url: "update",
                    $method: "POST",
                    $requires: ["billing_id"],
                    $format: Template(() => `update/${billing_id}`)
                  },
                  delete: {
                    $url: "delete",
                    $method: "POST",
                    $requires: ["billing_id"],
                    $format: Template(() => `delete/${billing_id}`)
                  },
                  project: {
                    $url: "project",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `project/${project_id}`)
                  }
                }
              }
            },
            //endregion Finances

            //region Operations
            operations: {
              $prefix: "operations",
              $children: {
                //region Flights
                flights: {
                  $prefix: "flights",

                  fetchAll: {
                    $url: "",
                    $method: "GET"
                  },
                  fetch: {
                    $url: "fetch",
                    $method: "GET",
                    $requires: ["flight_id"],
                    $format: Template(() => `fetch/${flight_id}`)
                  },
                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  update: {
                    $url: "update",
                    $method: "POST",
                    $requires: ["flight_id"],
                    $format: Template(() => `update/${flight_id}`)
                  },
                  delete: {
                    $url: "delete",
                    $method: "POST",
                    $requires: ["flight_id"],
                    $format: Template(() => `delete/${flight_id}`)
                  },
                  project: {
                    $url: "project",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `project/${project_id}`)
                  }
                },
                //endregion Flights

                //region Accomplishments
                accomplishments: {
                  $prefix: "accomplishments",

                  fetchAll: {
                    $url: "",
                    $method: "GET"
                  },
                  fetch: {
                    $url: "fetch",
                    $method: "GET",
                    $requires: ["id"],
                    $format: Template(() => `fetch/${id}`)
                  },
                  approval: {
                    $url: "approval",
                    $method: "POST",
                    $requires: ["approval_status", "accomplishment_id"],
                    $format: Template(() => `${approval_status}/${accomplishment_id}`)
                  },
                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  draft: {
                    $url: "draft",
                    $method: "POST"
                  },
                  generate: {
                    $url: "generate",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `generate/${project_id}`)
                  },
                  update: {
                    $url: "update",
                    $method: "POST",
                    $requires: ["sowa_id"],
                    $format: Template(() => `update/${sowa_id}`)
                  },
                  createItem: {
                    $url: "create/item",
                    $method: "POST"
                  },
                  project: {
                    $url: "project",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `project/${project_id}`)
                  },
                  latest: {
                    $url: "latest",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `latest/${project_id}`)
                  },
                  latestProject: {
                    $url: "latest/project",
                    $method: "GET",
                    $requires: ["project_id"],
                    $format: Template(() => `latest/project/${project_id}`)
                  },
                  fetchPdf: {
                    $url: "fetch/pdf",
                    $method: "GET",
                    $requires: ["sowaID"],
                    $format: Template(() => `fetch/${sowaID}/pdf`)
                  },
                  config: {
                    $url: "config",
                    $method: "GET"
                  }
                },
                //endregion Accomplishments

                //region Issues
                issues: {
                  $prefix: "issues",

                  fetchAll: {
                    $url: "",
                    $method: "GET"
                  },
                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  update: {
                    $url: "update",
                    $method: "POST",
                    $requires: ["id"],
                    $format: Template(() => `update/${id}`)
                  },
                  delete: {
                    $url: "delete",
                    $method: "POST",
                    $requires: ["id"],
                    $format: Template(() => `delete/${id}`)
                  },
                  search: {
                    $url: "search",
                    $method: "GET"
                  },
                  fetch: {
                    $url: "fetch",
                    $method: "GET",
                    $requires: ["id"],
                    $format: Template(() => `fetch/${id}`)
                  },
                  user: {
                    $url: "user",
                    $method: "GET"
                  },
                  config: {
                    $url: "config",
                    $method: "GET"
                  },

                  $children: {
                    assignees: {
                      create: {
                        $url: "assignees/create",
                        $method: "POST",
                        $requires: ["id"],
                        $format: Template(() => `${id}/assignees/create`)
                      },
                      update: {
                        $url: "assignees/update",
                        $method: "POST",
                        $requires: ["id", "assignee_id"],
                        $format: Template(
                          () => `${id}/assignees/update/${assignee_id}`
                        )
                      },
                      delete: {
                        $url: "assignees/delete",
                        $method: "POST",
                        $requires: ["id", "assignee_id"],
                        $format: Template(
                          () => `${id}/assignees/delete/${assignee_id}`
                        )
                      },
                      fetchAll: {
                        $url: "assignees",
                        $method: "GET",
                        $requires: ["id"],
                        $format: Template(() => `${id}/assignees`)
                      },
                      search: {
                        $url: "assignees/search",
                        $method: "GET",
                        $requires: ["id"],
                        $format: Template(() => `${id}/assignees/search`)
                      },
                      fetch: {
                        $url: "assignees/fetch",
                        $method: "GET",
                        $requires: ["id", "assignee_id"],
                        $format: Template(
                          () => `${id}/assignees/fetch/${assignee_id}`
                        )
                      }
                    },
                    tags: {
                      create: {
                        $url: "tags/create",
                        $method: "POST",
                        $requires: ["id"],
                        $format: Template(() => `${id}/tags/create`)
                      },
                      update: {
                        $url: "tags/update",
                        $method: "POST",
                        $requires: ["id", "tag_id"],
                        $format: Template(() => `${id}/tags/update/${tag_id}`)
                      },
                      delete: {
                        $url: "tags/delete",
                        $method: "POST",
                        $requires: ["id", "tag_id"],
                        $format: Template(() => `${id}/tags/delete/${tag_id}`)
                      },
                      search: {
                        $url: "tags/search",
                        $method: "GET",
                        $requires: ["id"],
                        $format: Template(() => `${id}/tags/search`)
                      },
                      fetchAll: {
                        $url: "tags",
                        $method: "GET",
                        $requires: ["id"],
                        $format: Template(() => `${id}/tags`)
                      },
                      fetch: {
                        $url: "tags/fetch",
                        $method: "GET",
                        $requires: ["id", "tag_id"],
                        $format: Template(() => `${id}/tags/fetch/${tag_id}`)
                      }
                    },
                    updates: {
                      create: {
                        $url: "updates/create",
                        $method: "POST",
                        $requires: ["id"],
                        $format: Template(() => `${id}/updates/create`)
                      },
                      update: {
                        $url: "updates/update",
                        $method: "POST",
                        $requires: ["id", "update_id"],
                        $format: Template(
                          () => `${id}/updates/update/${update_id}`
                        )
                      },
                      delete: {
                        $url: "updates/delete",
                        $method: "POST",
                        $requires: ["id", "update_id"],
                        $format: Template(
                          () => `${id}/updates/delete/${update_id}`
                        )
                      },
                      search: {
                        $url: "updates/search",
                        $method: "GET",
                        $requires: ["id"],
                        $format: Template(() => `${id}/updates/search`)
                      },
                      fetchAll: {
                        $url: "updates",
                        $method: "GET",
                        $requires: ["id"],
                        $format: Template(() => `${id}/updates`)
                      },
                      fetch: {
                        $url: "updates/fetch",
                        $method: "GET",
                        $requires: ["id", "update_id"],
                        $format: Template(
                          () => `${id}/updates/fetch/${update_id}`
                        )
                      }
                    },
                    viewers: {
                      fetchAll: {
                        $url: "",
                        $method: "GET",
                        $requires: ["issue_id"],
                        $format: Template(() => `${issue_id}/viewers`)
                      },
                      create: {
                        $url: "create",
                        $method: "POST",
                        $requires: ["issue_id"],
                        $format: Template(() => `${issue_id}/viewers/create`)
                      }
                    }
                  }
                }
                //endregion Issues
              }
            },
            //endregion Operations
            planning: {
              $prefix: "planning",
              $children: {
                //region WorkItems
                workItems: {
                  $prefix: "work_items",

                  fetchAll: {
                    $url: "",
                    $method: "GET"
                  },
                  fetch: {
                    $url: "fetch",
                    $method: "GET",
                    $requires: ["work_item_id"],
                    $format: Template(() => `fetch/${work_item_id}`)
                  },
                  create: {
                    $url: "create",
                    $method: "POST"
                  },
                  update: {
                    $url: "update",
                    $method: "POST",
                    $requires: ["work_item_id"],
                    $format: Template(() => `update/${work_item_id}`)
                  },
                  updateSortIndex: {
                    $url: "adjust/sorting",
                    $method: "POST",
                  },
                  delete: {
                    $url: "delete",
                    $method: "POST",
                    $requires: ["work_item_id"],
                    $format: Template(() => `delete/${work_item_id}`)
                  },

                  $children: {
                    project: {
                      $prefix: "project",

                      fetchAll: {
                        $url: "",
                        $method: "GET",
                        $requires: ["project_id"],
                        $format: Template(() => `${project_id}`)
                      },
                      new: {
                        $url: "new",
                        $method: "GET",
                        $requires: ["project_id"],
                        $format: Template(() => `${project_id}/new`)
                      }
                    }
                  }
                }
                //endregion WorkItems
              }
            },
            //region Information
            information: {
              $prefix: "information",
              $children: {
                assets: {
                  $prefix: "assets",
                  $children: {
                    devices: {
                      $prefix: "devices",

                      fetchAll: {
                        $url: "all",
                        $method: "GET"
                      }
                    },
                    positions: {
                      $prefix: "positions",

                      fetchAll: {
                        $url: "all",
                        $method: "GET"
                      }
                    },
                    routes: {
                      $prefix: "routes",

                      fetchAll: {
                        $url: "all",
                        $method: "GET"
                      }
                    },
                    trips: {
                      $prefix: "trips",

                      fetchAll: {
                        $url: "all",
                        $method: "GET"
                      }
                    }
                  }
                }
              }
            }
            //endregion Information
          }
        },
        //endregion Projects

        //region JObOrders
        jobOrders: {
          $prefix: "job_orders",

          create: {
            $url: "create",
            $method: "POST",
          },
          draft: {
            $url: "draft",
            $method: "POST",
          },
          approve: {
            $url: "approve",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `approve/${id}`)
          },
          cancel: {
            $url: "cancel",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `cancel/${id}`)
          },
          fetchAll: {
            $url: "",
            $method: "GET",
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["id"],
            $format: Template(() => `fetch/${id}`)
          },
          reject: {
            $url: "reject",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `reject/${id}`)
          },
        },
        //endregion JobOrders

        //region MaterialRequisitions
        materialRequisitions: {
          $prefix: "material_requisitions",

          create: {
            $url: "create",
            $method: "POST",
          },
          draft: {
            $url: "draft",
            $method: "POST",
          },
          approve: {
            $url: "approve",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `approve/${id}`)
          },
          cancel: {
            $url: "cancel",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `cancel/${id}`)
          },
          fetchAll: {
            $url: "",
            $method: "GET",
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["id"],
            $format: Template(() => `fetch/${id}`)
          },
          reject: {
            $url: "reject",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `reject/${id}`)
          },
        },
        //endregion MaterialRequisitions

        //region JobAccomplishments
        jobAccomplishments: {
          $prefix: "job_accomplishments",

          create: {
            $url: "create",
            $method: "POST",
          },
          draft: {
            $url: "draft",
            $method: "POST",
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },
          cancel: {
            $url: "cancel",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `cancel/${id}`)
          },
          fetchAll: {
            $url: "",
            $method: "GET",
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["id"],
            $format: Template(() => `fetch/${id}`)
          },
        },
        //endregion JobAccomplishments

        //region Suppliers
        suppliers: {
          $prefix: "suppliers",

          fetchAll: {
            $url: "",
            $method: "GET"
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["supplier_id"],
            $format: Template(() => `fetch/${supplier_id}`)
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["supplier_id"],
            $format: Template(() => `update/${supplier_id}`)
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["supplier_id"],
            $format: Template(() => `delete/${supplier_id}`)
          }
        },
        //endregion Suppliers

        //region Engineers
        engineers: {
          $prefix: "engineers",

          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["engineer_id"],
            $format: Template(() => `fetch/${engineer_id}`)
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["engineer_id"],
            $format: Template(() => `update/${engineer_id}`)
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["engineer_id"],
            $format: Template(() => `delete/${engineer_id}`)
          }
        },
        //endregion Engineers

        //region Users
        users: {
          $prefix: "users",

          fetchAll: {
            $url: "",
            $method: "GET"
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["user_id"],
            $format: Template(() => `fetch/${user_id}`)
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          register: {
            $url: "register",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["user_id"],
            $format: Template(() => `update/${user_id}`)
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["user_id"],
            $format: Template(() => `delete/${user_id}`)
          },
          changePassword: {
            $url: "change/password",
            $method: "POST",
            $requires: ["user_id"],
            $format: Template(() => `${user_id}/change/password`)
          },
          permissions: {
            $url: "fetch/permission",
            $method: "GET",
            $requires: ["user_id"],
            $format: Template(() => `${user_id}/fetch/permission`),

            $children: {
              assign: {
                $url: "assign/permission",
                $method: "POST",
                $requires: ["user_id"],
                $format: Template(() => `${user_id}/assign/permission`)
              },
              remove: {
                $url: "remove/permission",
                $method: "POST",
                $requires: ["user_id"],
                $format: Template(() => `${user_id}/remove/permission`)
              }
            }
          },

          $children: {
            role: {
              assign: {
                $url: "role/assign",
                $method: "POST",
                $requires: ["user_id"],
                $format: Template(() => `${user_id}/assign/role`)
              },
              fetchAll: {
                $url: "fetch/role",
                $method: "GET",
                $requires: ["user_id"],
                $format: Template(() => `${user_id}/fetch/role`)
              },
              remove: {
                $url: "role/remove",
                $method: "POST",
                $requires: ["user_id"],
                $format: Template(() => `${user_id}/remove/role`)
              }
            }
          }
        },
        //endregion Users

        //region Groups
        groups: {
          $prefix: "groups",

          assign: {
            $url: "assign",
            $method: "POST",
            $requires: ["user_id"],
            $format: Template(() => `assign/${user_id}`),
          },
          create: {
            $url: "create",
            $method: "POST",
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["group_id"],
            $format: Template(() => `delete/${group_id}`),
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["group_id"],
            $format: Template(() => `fetch/${group_id}`),
          },
          fetchAll: {
            $url: "",
            $method: "GET",
          },
          remove: {
            $url: "remove",
            $method: "POST",
            $requires: ["user_id"],
            $format: Template(() => `remove/${user_id}`),
          },
          search: {
            $url: "search",
            $method: "GET",
          },
          update: {
            $url: "update",
            $method: "POST",
          },
          users: {
            $url: "users",
            $method: "GET",
          },
        },
        //endregion Groups

        //region RBAC
        rbac: {
          $prefix: "rbac",
          $children: {
            roles: {
              $prefix: "roles",

              fetchAll: {
                $url: "",
                $method: "GET"
              },
              fetch: {
                $url: "fetch",
                $method: "GET",
                $requires: ["role_id"],
                $format: Template(() => `fetch/${role_id}`)
              },
              create: {
                $url: "create",
                $method: "POST"
              },
              update: {
                $url: "update",
                $method: "POST",
                $requires: ["role_id"],
                $format: Template(() => `update/${role_id}`)
              },
              delete: {
                $url: "delete",
                $method: "POST",
                $requires: ["role_id"],
                $format: Template(() => `delete/${role_id}`)
              },

              $children: {
                permissions: {
                  give: {
                    $url: "permissions/give",
                    $method: "POST",
                    $requires: ["role_id"],
                    $format: Template(() => `${role_id}/give/permission`)
                  },
                  revoke: {
                    $url: "permissions/revoke",
                    $method: "POST",
                    $requires: ["role_id"],
                    $format: Template(() => `${role_id}/remove/permission`)
                  },
                  fetchAll: {
                    $url: "permissions/fetch",
                    $method: "GET",
                    $requires: ["role_id"],
                    $format: Template(() => `${role_id}/fetch/permission`)
                  }
                }
              }
            },
            permissions: {
              $prefix: "permissions",

              fetchAll: {
                $url: "",
                $method: "GET"
              },
              fetch: {
                $url: "fetch",
                $method: "GET",
                $requires: ["permission_id"],
                $format: Template(() => `fetch/${permission_id}`)
              },
              create: {
                $url: "create",
                $method: "POST"
              },
              update: {
                $url: "update",
                $method: "POST",
                $requires: ["permission_id"],
                $format: Template(() => `update/${permission_id}`)
              },
              delete: {
                $url: "delete",
                $method: "POST",
                $requires: ["permission_id"],
                $format: Template(() => `delete/${permission_id}`)
              }
            }
          }
        },
        //endregion RBAC

        //region Entities
        entities: {
          $prefix: "entities",

          fetchAll: {
            $url: "",
            $method: "GET"
          },
          fetch: {
            $url: "fetch",
            $method: "GET",
            $requires: ["entity_id"],
            $format: Template(() => `fetch/${entity_id}`)
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["entity_id"],
            $format: Template(() => `update/${entity_id}`)
          },
          delete: {
            $url: "delete",
            $method: "POST",
            $requires: ["entity_id"],
            $format: Template(() => `delete/${entity_id}`)
          },
          search: {
            $url: "search",
            $method: "GET"
          }
        },
        //endregion Entities

        //region Employees
        employees: {
          $prefix: 'employees',

          fetch: {
            $url: 'fetch',
            $method: 'GET',
            $requires: ['id'],
            $format: Template(() => `fetch/${id}`),
          },
          fetchAll: {
            $url: '',
            $method: 'GET',
          },
          search: {
            $url: 'search',
            $method: 'GET',
          },
          create: {
            $url: 'create',
            $method: 'POST',
          },
          update: {
            $url: 'update',
            $method: 'POST',
            $requires: ['id'],
            $format: Template(() => `update/${id}`),
          },
        },
        //endregion Employees

        //region Variables
        variables: {
          $prefix: "variables",

          config: {
            $url: "config",
            $method: "GET"
          }
        },
        //endregion Variables

        //region Notifications
        notifications: {
          $prefix: 'notifications',

          read: {
            $url: 'read',
            $method: 'POST',
            $requires: ['id'],
            $format: Template(() => `read/${id}`),
          },
          unread: {
            $url: 'unread',
            $method: 'GET',
          },
        },
        //endregion Notifications

        //region Static
        static: {
          $prefix: "static",

          configs: {
            $url: "config",
            $method: "GET"
          }
        }
        //endregion Static
      }
    }
    //endregion API paths
  }
};

/**
 *Formats the passed callback to its full url path.
 *
 * @param {function} cb
 * return function
 */
function Template(cb) {
  return function (data) {
    const dataKeys = [];
    const dataVals = [];
    for (let key in data) {
      dataKeys.push(key);
      dataVals.push(data[key]);
    }
    let func = new Function(...dataKeys, "return (" + cb + ")();");
    return func(...dataVals);
  };
}

/**
 * Export const api for api-helper consumption.
 */
export {
  api
};
