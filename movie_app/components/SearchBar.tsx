
import { icons } from '@/constants/icons'
import { Image, TextInput, View } from 'react-native'

interface Props{
    onPress?:()=>void;
    placeholder:string;
}

const SearchBar = ({onPress, placeholder}:Props) => {

    return (
      <View className='flex-row items-center bg-dark-200  rounded-full px-5 py-4 justify-between'>
   <Image source={icons.search}
    className='size-5 resizeMode="contain" tintColor="#A8Bbff" "' />
<TextInput
onPress={onPress}
placeholder={placeholder}
onChangeText={()=>{}}
value=""
placeholderTextColor="#A8Bbff"
className='flex-1 ml-2 text-white text-base font-semibold'

/> 
      </View>
    )
  }


export default SearchBar
