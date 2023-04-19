import React, { memo } from 'react'
import { Text, Pressable } from 'react-native'

interface FilterComponentProps {
  filterDay: string
  filterText: string
  selectedRange: string
  setSelectedRange: (filter: string) => void
}

const FilterComponent = ({
  filterDay,
  filterText,
  selectedRange,
  setSelectedRange,
}: FilterComponentProps) => {
  const isFilterSelected = (filter: any) => filter === selectedRange

  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? '#1e1e1e'
          : 'transparent',
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? 'white' : 'grey' }}>
        {filterText}
      </Text>
    </Pressable>
  )
}

export default memo(FilterComponent)
