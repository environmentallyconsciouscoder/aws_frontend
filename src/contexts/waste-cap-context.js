import React, { createContext, useEffect, useState } from 'react'

export const WasteCapContext = createContext()

const WasteCapContextProvider = props => {

  const [allCappingValue, setAllCappingValue] = useState({
    "wastePerCoverCappingValues": [
      {
        "id": 0,
        "label": "wastePerCoverCoverWastes",
        "type": "C",
        "value": 0
      },
      {
        "id": 1,
        "label": "wastePerCoverSpoilageWastes",
        "type": "S",
        "value": 0
      },
      {
        "id": 2,
        "label": "wastePerCoverPreparationWastes",
        "type": "P",
        "value": 0
      }
    ],
    "wastePerSalesCappingValues": [
      {
        "id": 0,
        "label": "wastePerSalesCoverWastes",
        "type": "C",
        "value": 0
      },
      {
        "id": 1,
        "label": "wastePerSalesSpoilageWastes",
        "type": "S",
        "value": 0
      },
      {
        "id": 2,
        "label": "wastePerSalesPreparationWastes",
        "type": "P",
        "value": 0
      }
    ],
  })

  const [weeklyCoverWastes, setWeeklyCoverWastes] = useState(0)
  const [weeklySpoliageWastes, setWeeklySpoliageWastes] = useState(0)
  const [weeklyPeparationWastes, setWeeklyPeparationWastes] = useState(0)

  const [selectedSiteCoverWastes, setSelectedSiteCoverWastes] = useState(0)
  const [selectedSiteSpoliageWastes, setSelectedSiteSpoliageWastes] = useState(0)
  const [selectedSitePeparationWastes, setSelectedSitePeparationWastes] = useState(0)

  const [dailyCoverWastes, setDailyCoverWastes] = useState(0)
  const [dailySpoliageWastes, setDailySpoliageWastes] = useState(0)
  const [dailyPeparationWastes, setDailyPeparationWastes] = useState(0)

  const [hourlyCoverWastes, setHourlyCoverWastes] = useState(0)
  const [hourlySpoliageWastes, setHourlySpoliageWastes] = useState(0)
  const [hourlyPeparationWastes, sethHourlyPeparationWastes] = useState(0)

  const [wastePerCoverCoverWastes, setWastePerCoverCoverWastes] = useState(0)
  const [wastePerCoverSpoilageWastes, setWastePerCoverSpoilageWastes] = useState(0)
  const [wastePerCoverPrepWastes, setWastePerCoverPrepWastes] = useState(0)

  const [wastePerSalesCoverWastes, setWastePerSalesCoverWastes] = useState(0)
  const [wastePerSalesSpoilageWastes, setWastePerSalesSpoilageWastes] = useState(0)
  const [wastePerSalesPrepWastes, setWastePerSalesPrepWastes] = useState(0)

  const [showPounds, setShowPounds] = useState(false)

  useEffect(() => {

    if (props.cappingValue) {
      getAllCappingDataForForm(props.cappingValue.Items[0].cappingValue)
      getWeeklyCappingValue(props.cappingValue.Items[0].cappingValue.weeklyCappingValues)
      getSelectedSiteCappingValue(props.cappingValue.Items[0].cappingValue.totalCappingValues)
      getHourlyCappingValue(props.cappingValue.Items[0].cappingValue.hourlyCappingValues)
      getDailyCappingValue(props.cappingValue.Items[0].cappingValue.dailyCappingValues)
      getWastePerCoverCappingValue(props.cappingValue.Items[0].cappingValue.wastePerCoverCappingValues)
      getWastePerSalesCappingValue(props.cappingValue.Items[0].cappingValue.wastePerSalesCappingValues)
    }

    setShowPounds(props.showPounds)

  }, [props.cappingValue, props.showPounds])

  const getAllCappingDataForForm = (cappingValue) => {
    setAllCappingValue(cappingValue);
  }

  const getWeeklyCappingValue = (cappingValues) => {
    const cover = cappingValues.filter((data) => {
      return data.label === "weeklyCoverWastes"
    });

    const spoilage = cappingValues.filter((data) => {
      return data.label === "weeklySpoilageWastes"
    });

    const prep = cappingValues.filter((data) => {
      return data.label === "weeklyPreparationWastes"
    });

    setWeeklyCoverWastes(cover[0].value)
    setWeeklySpoliageWastes(spoilage[0].value)
    setWeeklyPeparationWastes(prep[0].value)
  }

  const getHourlyCappingValue = (cappingValues) => {
    const cover = cappingValues.filter((data) => {
      return data.label === "hourlyCoverWastes"
    });

    const spoilage = cappingValues.filter((data) => {
      return data.label === "hourlySpoilageWastes"
    });

    const prep = cappingValues.filter((data) => {
      return data.label === "hourlyPreparationWastes"
    });

    setHourlyCoverWastes(cover[0].value)
    setHourlySpoliageWastes(spoilage[0].value)
    sethHourlyPeparationWastes(prep[0].value)
  }

  const getDailyCappingValue = (cappingValues) => {
    const cover = cappingValues.filter((data) => {
      return data.label === "dailyCoverWastes"
    });

    const spoilage = cappingValues.filter((data) => {
      return data.label === "dailySpoilageWastes"
    });

    const prep = cappingValues.filter((data) => {
      return data.label === "dailyPreparationWastes"
    });

    setDailyCoverWastes(cover[0].value)
    setDailySpoliageWastes(spoilage[0].value)
    setDailyPeparationWastes(prep[0].value)
  }

  const getSelectedSiteCappingValue = (cappingValues) => {

    const cover = cappingValues.filter((data) => {
      return data.label === "totalCoverWastes"
    });

    const spoilage = cappingValues.filter((data) => {
      return data.label === "totalSpoilageWastes"
    });

    const prep = cappingValues.filter((data) => {
      return data.label === "totalPreparationWastes"
    });

    setSelectedSiteCoverWastes(cover[0].value)
    setSelectedSiteSpoliageWastes(spoilage[0].value)
    setSelectedSitePeparationWastes(prep[0].value)
  }

  const getWastePerCoverCappingValue = (cappingValues) => {

    const cover = cappingValues.filter((data) => {
      return data.label === "wastePerCoverCoverWastes"
    });

    const spoilage = cappingValues.filter((data) => {
      return data.label === "wastePerCoverSpoilageWastes"
    });

    const prep = cappingValues.filter((data) => {
      return data.label === "wastePerCoverPreparationWastes"
    });

    setWastePerCoverCoverWastes(cover[0].value)
    setWastePerCoverSpoilageWastes(spoilage[0].value)
    setWastePerCoverPrepWastes(prep[0].value)
  }

  const getWastePerSalesCappingValue = (cappingValues) => {
    const cover = cappingValues.filter((data) => {
      return data.label === "wastePerSalesCoverWastes"
    });

    const spoilage = cappingValues.filter((data) => {
      return data.label === "wastePerSalesSpoilageWastes"
    });

    const prep = cappingValues.filter((data) => {
      return data.label === "wastePerSalesPreparationWastes"
    });

    setWastePerSalesCoverWastes(cover[0].value)
    setWastePerSalesSpoilageWastes(spoilage[0].value)
    setWastePerSalesPrepWastes(prep[0].value)
  }

  return (
    <WasteCapContext.Provider
      value={{
        wastePerSalesCoverWastes,
        wastePerSalesSpoilageWastes,
        wastePerSalesPrepWastes,

        allCappingValue,
        weeklyCoverWastes,
        weeklySpoliageWastes,
        weeklyPeparationWastes,
        showPounds,

        selectedSiteCoverWastes,
        selectedSiteSpoliageWastes,
        selectedSitePeparationWastes,

        dailyCoverWastes,
        dailySpoliageWastes,
        dailyPeparationWastes,

        hourlyCoverWastes,
        hourlySpoliageWastes,
        hourlyPeparationWastes,

        wastePerCoverCoverWastes,
        wastePerCoverSpoilageWastes,
        wastePerCoverPrepWastes
      }}
    >
      {props.children}
    </WasteCapContext.Provider>
  )
}

export default WasteCapContextProvider