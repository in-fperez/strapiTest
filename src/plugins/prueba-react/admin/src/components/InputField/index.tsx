import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import { TextInput, Select, Option, Box, Flex, Button, Checkbox } from '@strapi/design-system';


const InputField = (props) => {

    const queryParams = new URLSearchParams(window.location.search);
    const locale = queryParams.get("plugins[i18n][locale]");

    let initial = {
        id: '',
        type: 'custom',
        anchor: '',
        target: '_self',
        ofuscate: false,
        shop: locale
    }

    if(props.value != 'null' ) {
        initial = JSON.parse(props.value);
    }

    const { formatMessage } = useIntl();

    const [ecomValue,setEcomValue] = useState(initial);

    const [checkOk, setCheckOk] = useState('primary');


    const setIdLink = e => {
        setEcomValue( ecomValue => ({
            ...ecomValue,
            id: e.target.value
        }));
    }

    const setTypeLink = e => {
        let type_ = '';
        if(typeof e == 'string'){
            type_ = e;
        }else {
            type_ = e.target.value;
        }
        setEcomValue( ecomValue => ({
            ...ecomValue,
            type: type_
        }));
    }

    const setAnchorText = e => {
        setEcomValue( ecomValue => ({
            ...ecomValue,
            anchor: e.target.value
        }));
    }

    const setOfuscate = e => {
        setEcomValue( ecomValue => ({
            ...ecomValue,
            ofuscate: !ecomValue.ofuscate
        }));
    }

    const setTargetLink = e => {
        let target_ = '';
        if(typeof e == 'string'){
            target_ = e;
        }else {
            target_ = e.target.value;
        }
        setEcomValue( ecomValue => ({
            ...ecomValue,
            target: target_,
        }));
    }

    const checkUrl = async () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBza2x1bS5jb20iLCJ1c2VySWQiOiI0Nzg3MGY1My1kNGM4LTQxNGEtYWVlZS0xZjM5M2QxYzQ5ZTEiLCJpYXQiOjE2NTUyMDU0NjYsImV4cCI6ODY0MDE2NTUyMDU0NjZ9.BZh2EIFEVJ7w-SDs423H_fOx3rolFBqZPDSWJHYznWs';

        // if(ecomValue.type == 'category') {
            const body = {
                shopId: 11,
                langId: 1,
                properties: [ "name" ],
                categoryIds: [ +ecomValue.id ]
            };
        // }
        

        const paramsFetch = {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer " + token,
            },
            body: JSON.stringify(body)
        };

        console.log(paramsFetch);


        try {

            const response = await fetch('http://10.3.200.156:4003/api/ecom-catalog/category/getCategories', paramsFetch);
            const json = await response.json();

            if(Object.keys(json.data).length == 0){   
                setCheckOk('danger');
                return false;
            }
            setCheckOk('success');
            return json;

        }catch(error) {
           console.log(error);
           setCheckOk('danger');
           return false;
        }

    }



    const handleClick = async (e) => {

        const response = await checkUrl();

        if(response) {
            const res = response.data.categories[0];
     
            console.log('handleClick',ecomValue,response);

            setEcomValue(ecomValue => ({
                ...ecomValue,
                id: res.id,
                anchor: res.name,
            }));
      
        }
    
    }

    


    const changeValue = () => {
       
        const arg = 
        {
            target: {
                name,
                value: JSON.stringify(ecomValue),
            },
        };
        onChange(arg);
  
    }


    useEffect(changeValue,[ecomValue]);

    const {
        name,
        value,
        attribute,
        onChange,
        intlLabel,
        intlDescription
    } = props;

    const {
        // All our custom field config are here
        placeholder,
        label,
        hint,
    } = attribute.customFieldConfig || {};
    

  return (
    <Box padding={2} borderColor="neutral150" shadow="filterShadow">
      <Flex
        style={{gap: "5px"}}
        alignItems={'flex-end'}
      >
        <TextInput
          id={name}
          placeholder={placeholder}
          label={'Anchor text'}
          name={name}
          hint={hint}        
          value={ecomValue.anchor}
          onChange={setAnchorText}
        />
        <Select 
          id="select-type" 
          label="target link" 
          style={{maxWidth: "150px"}}
          onClear={() => setTargetLink('_self')} 
          clearLabel="Clear selection" 
          value={ecomValue.target} 
          onChange={setTargetLink} 
          selectButtonTitle="Choose target">
            <Option value="_self"> _self </Option>
            <Option value="_blank"> _blank </Option>
            <Option value="_parent"> _parent </Option>
            <Option value="_top"> _top </Option>
        </Select>
        <Checkbox  
            checked={ecomValue.ofuscate}
            onChange={setOfuscate} 

            >Ofuscate</Checkbox>
      </Flex>
      <Flex
        style={{gap: "5px"}}
        alignItems={'flex-end'}
      >
        <TextInput
          label={"string or ID"}
          value={ecomValue.id}  
          onChange={setIdLink}      
        />
        <Select 
          id="select-type" 
          label="type link" 
          style={{maxWidth: "150px"}}
          onClear={() => setTypeLink('custom')} 
          clearLabel="Clear selection" 
          value={ecomValue.type} 
          onChange={setTypeLink} 
          selectButtonTitle="Choose type">
            <Option value="custom"> Custom url </Option>
            <Option value="category"> Category ID </Option>
            <Option value="cms"> Cms ID </Option>
            <Option value="product"> Product ID </Option>
        </Select>
        <Button 
          variant={checkOk}
          size="L"
          onClick={handleClick}
          style={{display: ecomValue.type == 'custom' ?'none' : 'initial'}}
        >Check</Button>
      </Flex>
    </Box>
  );
}

export default InputField;
