import { API } from "aws-amplify";
import CheckRequest from "./shared/components/libs/use-check-request"

const {
  checkWeeklyWasteData,
  checkWastePerCoverOrSales,
  checkAllSitesData,
  checkGetDailyAndWeeklyDatesData
} = CheckRequest()

// getWastePerCover,
export const getWastePerCover = (id, company, site, month, year) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getWastePerCoverData`,
      {
        'queryStringParameters': {
          'id': id,
          'company': company,
          'site': site,
          'month': month,
          // 'year': year
        }
      }
    )
      .then((res) => {
        const result = checkWastePerCoverOrSales(res)
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getWastePerSales,
export const getWastePerSales = (id, company, site, month, year) => {
  // console.log("monthly",month)
  // console.log("yearly",year)
  // console.log("selectedSiteValueID",site)
  // console.log("companyID",id)
  // console.log("companyName",company)
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getWastePerSalesData`,
      {
        'queryStringParameters': {
          'id': id,
          'company': company,
          'site': site,
          'month': month,
          // 'year': year
        }
      }
    )
      .then((res) => {
        // console.log("here res",res)
        const result = checkWastePerCoverOrSales(res)
        // console.log("result",result)
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getMonthlyWastes,
export const getMonthlyWastes = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getMonthlyWasteData`, {
      'queryStringParameters': {
        'companyName': companyName,
        'companyNumber': companyNumber,
        'siteID': siteID
      }
    }).then((res) => {
      // console.log("res", res);
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

// getAllCompaniesBack,
export const getAllCompaniesBack = () => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getAllCompaniesBack`).then((res) => {
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

// getAllSitesData,
export const getAllSitesData = (companyNumber, companyName) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getAllSitesData`, {
      'queryStringParameters': {
        'id': companyNumber,
        'companyName': companyName
      }
    }).then((res) => {
      const result = checkAllSitesData(res);
      // console.log("result",result)
      // console.log("res",res)
      resolve(result);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

// getWeeklyWaste,
export const getWeeklyWaste = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getWeeklyWasteData`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID
        }
      }
    ).then((res) => {
      const result = checkWeeklyWasteData(res)
      resolve(result);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

// getTargets,
export const getTargets = (id, company, site) => {
  // console.log("getTargets")
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getTargets`,
      {
        'queryStringParameters': {
          'id': id,
          'company': company,
          'site': site
        }
      }
    )
      .then((res) => {
        // console.log("res",res)
        resolve(res);
      })
      .catch((error) => {
        // console.log("error",error)
        reject(error);
      });
  });
};

// getAiPredictionData,
export const getAiPredictionData = (id, company, site) => {
  // console.log("selectedSiteValueID",site)
  // console.log("companyID",id)
  // console.log("companyName",company)
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getAiPredictionData`,
      {
        'queryStringParameters': {
          'id': id,
          'company': company,
          'site': site
        }
      }
    )
      .then((res) => {
        // console.log("res",res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getCapping,
export const getCapping = (id, company, site) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getCapping`,
      {
        'queryStringParameters': {
          'id': id,
          'company': company,
          'site': site
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getDailyAndWeeklyDatesData,
export const getDailyAndWeeklyDatesData = (companyNumber, companyName, siteID) => {

  // console.log("getDailyAndWeeklyDatesData companyNumber", companyNumber)
  // console.log("getDailyAndWeeklyDatesData companyName", companyName)
  // console.log("getDailyAndWeeklyDatesData siteID", siteID)

  return new Promise((resolve, reject) => {
    API.get("wastes", `/getDailyAndWeeklyDatesData`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID
        }
      }
    ).then((res) => {
      const result = checkGetDailyAndWeeklyDatesData(res)
      // console.log("result",result);
      resolve(result);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

// getCoverInput,
export const getCoverInput = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getCoverInput`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getSalesInput
export const getSalesInput = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getSalesInput`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getMasterTableData
export const getMasterTableData = (companyName, companyId) => {
  return new Promise((resolve, reject) => {

    // console.log("companyId",companyId)
    // console.log("companyName",companyName)

    API.get("wastes", `/masterTableData`,
      {
        'queryStringParameters': {
          'companyId': companyId,
          'companyName': companyName,
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


//OTHER GET REQUESTS
export const getLoginTimeFromUsers = (companyNumber, companyName) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getLoginTimeFromUsers`, {
      'queryStringParameters': {
        'companyName': companyName,
        'companyNumber': companyNumber
      }
    }).then((res) => {
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addToGroup = (username, groupName) => {
  // console.log("username",username)
  // console.log("groupName",groupName)

  return new Promise((resolve, reject) => {
    API.post("wastes", `/addUserToGroup`, { body: { username, groupName } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};

export const getLastYearMonthlyWaste = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getLastYearMonthlyWaste`, {
      'queryStringParameters': {
        'companyName': companyName,
        'companyNumber': companyNumber,
        'siteID': siteID
      }
    }).then((res) => {
      // console.log("res",res)
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

// getMenuInput,
export const getMenuInput = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getMenuInput`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID
        }
      }
    )
      .then((res) => {
        // console.log("getMenuInput",res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//GET WASTE ON A DAY OF THE WEEK
export const getWasteOnAdayOfTheWeek = (id, company, site, day, year) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getWasteOnADayOfTheWeek`,
      {
        'queryStringParameters': {
          'id': id,
          'company': company,
          'site': site,
          'day': day,
          'year': year
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTopCausesOfWaste = (id, companyName, siteId) => {

  // console.log("id getTopCausesOfWaste", id)
  // console.log("companyName getTopCausesOfWaste", companyName)
  // console.log("siteId getTopCausesOfWaste", siteId)

  return new Promise((resolve, reject) => {
    API.get("wastes", `/getTopCausesOfWaste`, {
      'queryStringParameters': {
        'companyName': companyName,
        'id': id,
        'siteID': siteId
      }
    }).then((res) => {
      // console.log(" getTopCausesOfWaste res", res)
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllCompanies = () => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getAllCompanies`).then((res) => {
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

//OTHER UPDATE/POST REQUESTS

export const updateUsersAttribute = (username, value) => {
  return new Promise((resolve, reject) => {
    API.post("wastes", `/updateUsersAttribute`, { body: { username, value } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error updateUsersAttribute", error)
        reject(error);
      });
  });
};

export const updateUsersLoginTime = (userDetails, companyID, time) => {
  // console.log("userDetails",userDetails)
  // console.log("companyID",companyID)
  // console.log("time",time)

  return new Promise((resolve, reject) => {
    API.put("wastes", `/updateUsersLoginTime/${companyID}`, { body: { userDetails, time } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error updateUsersLoginTime", error)
        reject(error);
      });
  });
};

export const createUserLoginTime = (name, username, company, companyID) => {
  return new Promise((resolve, reject) => {
    API.post("wastes", `/createUserLoginTime/`, { body: { name, username, company, companyID } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
}

export const addCoverInput = (covers) => {
  return new Promise((resolve, reject) => {
    API.post("wastes", `/addCoverInput`, { body: covers })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};

export const addSalesInput = (sales) => {
  return new Promise((resolve, reject) => {
    API.post("wastes", `/addSalesInput`, { body: sales })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};

export const postTargets = (data) => {
  // console.log("data",data)
  return new Promise((resolve, reject) => {
    API.put("wastes", `/updateRecommendedTargets`, { body: data })
      .then((res) => {
        // console.log("res",res)
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};

export const postCapping = (data) => {
  return new Promise((resolve, reject) => {
    API.put("wastes", `/updateCapping`, { body: data })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};

export const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    API.post("wastes", `/verifyEmailIdentity`, { body: { email } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};

// getPerformanceData,
export const getPerformanceData = (companyNumber, companyName, siteName) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getPerformanceData`, {
      'queryStringParameters': {
        'id': companyNumber,
        'company': companyName,
        'site': siteName
      }
    }).then((res) => {
      resolve(res);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addMenuInput = (menuItems, siteName, companyName, id) => {

  const companyInformation = {
    siteName: siteName,
    companyName: companyName,
    id: id
  };

  // console.log("menuItems",menuItems);
  return new Promise((resolve, reject) => {
    API.put("wastes", `/addMenuInput`, { body: { menuItems: menuItems, companyInformation: companyInformation } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addProductionPreparationInputs = (productionPreparation, siteName, companyName, id) => {
  const companyInformation = {
    siteName: siteName,
    companyName: companyName,
    id: id
  };
  // console.log("companyInformation",companyInformation);
  // console.log("productionPreparation",productionPreparation);

  return new Promise((resolve, reject) => {
    API.put("wastes", `/addProductionPreparationInputs`, { body: { productionPreparation: productionPreparation, companyInformation: companyInformation } })
      .then((res) => {
        // console.log("productionPreparation", res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getProductionPreparationInputs,
export const getProductionPreparationInputs = (companyNumber, companyName, siteID) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getProductionPreparationInputs`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID
        }
      }
    )
      .then((res) => {
        // console.log("getProductionPreparationInputs",res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductionPreparationInputsForGraph = (companyNumber, companyName, siteID, weekOfYear) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getProductionPreparationInputsForGraph`,
      {
        'queryStringParameters': {
          'companyName': companyName,
          'companyNumber': companyNumber,
          'siteID': siteID,
          'weekOfYear': weekOfYear
        }
      }
    )
      .then((res) => {
        // console.log("getProductionPreparationInputsForGraph",res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getWasteLabel
export const getWasteLabel = (companyName, companyId, siteName) => {
  return new Promise((resolve, reject) => {
    // console.log("companyId",companyId)
    // console.log("companyName",companyName)

    API.get("wastes", `/getWasteLabels`,
      {
        'queryStringParameters': {
          'companyId': companyId,
          'companyName': companyName,
          'siteName': siteName
        }
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// export const getPublicLiveFeed = (companyNumber, companyName, siteName) => {
//   return new Promise((resolve, reject) => {
//     API.get("livefeed", `/getPublicLiveFeed`, {
//       'queryStringParameters': {
//         'id': companyNumber,
//         'companyName': companyName,
//         'siteName': siteName
//       }
//     }).then((res) => {
//       console.log("res",res)
//       resolve(res);
//     })
//     .catch((error) => {
//       reject(error);
//     });
//   });
// };

export const getPublicLiveFeed = (companyNumber, companyName, siteName) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getPublicLiveFeed`, {
      'queryStringParameters': {
        'id': companyNumber,
        'companyName': companyName,
        'siteName': siteName
      }
    }).then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export const updateLiveFeedContent = (data, siteName, companyName, id) => {
  const companyInformation = {
    siteName: siteName,
    companyName: companyName,
    id: id
  };
  return new Promise((resolve, reject) => {
    API.post("wastes", `/updateLiveFeedContent`, { body: { contentResponses: data, companyInformation: companyInformation } })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getLiveFeedContent = (companyNumber, companyName, siteName) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getLiveFeedContent`, {
      'queryStringParameters': {
        'id': companyNumber,
        'companyName': companyName,
        'siteName': siteName
      }
    }).then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export const filterLiveFeedContent = (companyNumber, companyName, siteName, weekNumber) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/filterLiveFeedContent`, {
      'queryStringParameters': {
        'id': companyNumber,
        'companyName': companyName,
        'siteName': siteName,
        "weekNumber": weekNumber
      }
    }).then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

export const getIdCustomerWaste = (companyNumber, companyName, siteName, selected) => {
  return new Promise((resolve, reject) => {
    API.get("wastes", `/getIdCustomerWaste`, {
      'queryStringParameters': {
        'id': companyNumber,
        'companyName': companyName,
        'siteName': siteName,
        "selected": selected
      }
    }).then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
  });
};