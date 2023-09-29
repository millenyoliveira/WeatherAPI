import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, ActivityIndicator } from "react-native";
import { getClima } from './getClima'

export default function VerClima() {
    const [clima, setClima] = useState(null);
    const [local, setLocal] = useState('');

    async function carregaClima() {
        try {
            const resultado = await getClima(local);
            if (resultado && resultado.data) {
                const data = resultado.data;
                setClima(data);
            } else {
                console.error("Erro ao carregar clima: Resposta inválida");
                setClima(null);
            }
        } catch (error) {
            console.error("Erro ao carregar clima:", error.message);
            setClima(null);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            {clima ? (
                <>
                    <>
                        <Image source={{ uri: clima.current.condition.icon }} style={{ width: 75, height: 75 }} />
                    </>
                    <>
                        <Text style={{ color: 'white' }}>Local: {clima.location.name}</Text>
                        <Text style={{ color: 'white' }}>Temp: {clima.current.temp_c}°C</Text>
                        <Text style={{ color: 'white' }}>Estado: {clima.current.condition.text}</Text>
                    </>
                </>
            ) : (
                <>
                    <>
                        <ActivityIndicator color='pink' size='large' />
                    </>
                    <>
                        <Text style={{ color: 'white' }}>Local: Sem informação</Text>
                        <Text style={{ color: 'white' }}>Temp: Sem informação</Text>
                        <Text style={{ color: 'white' }}>Estado: Sem informação</Text>
                    </>
                </>
            )}
            <TextInput
                style={{ borderColor: "white", color: 'white', borderWidth: 1, width: 200, height: 25, margin: 10, padding: 10 }}
                placeholder="Digite o local"
                onChangeText={(loc) => setLocal(loc)}
                value={local}
            />
            <Button title="Mostrar clima" onPress={carregaClima} />
        </View>
    );
}
